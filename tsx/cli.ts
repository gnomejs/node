import { Command, type CommandArgs, type CommandOptions, ShellCommand, type ShellCommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";
import { isAbsolute, resolve } from "@std/path";
import { makeTempFileSync, writeTextFileSync } from "@gnome/fs";

pathFinder.set("tsx", {
    name: "tsx",
    windows: [
        ".\\node_modules\\.bin\\tsx.cmd",
        "${APPDATA}\\npm\\tsx.cmd",
        "${LOCALAPPDATA}\\nvs\\default\\tsx.cmd",
    ],
    linux: [
        "./node_modules/.bin/tsx",
        "/usr/local/lib/node_modules/.bin/tsx",
        "${HOME}/.nvs/default/bin/tsx",
    ],
});

export const TSX_EXT = ".ts";

/**
 * Represents a tsx cli command.
 */
export class TsxCliCommand extends Command {
    /**
     * Creates a new instance of the `TsxCliCommand` class.
     * @param args The command arguments.
     * @param options The command options.
     */
    constructor(args?: CommandArgs, options?: CommandOptions) {
        super("tsx", args, options);
    }
}

/**
 * Represents a tsx script or incline command executed using the `tsx` commandline.
 */
export class TsxShellCommand extends ShellCommand {
    /**
     * Creates a new instance of the `TsxShellCommand` class.
     * @param script The bash script to execute.
     * @param options The options for the bashell command.
     */
    constructor(script: string, options?: ShellCommandOptions) {
        super("tsx", script.trimEnd(), options);
    }

    /**
     * Gets the file extension associated with bash scripts.
     */
    get ext(): string {
        return TSX_EXT;
    }

    getScriptFile(): { file: string | undefined; generated: boolean } {
        let script = this.script.trimEnd();

        const exts = [".ts", ".mts", ".cts"];
        if (!script.match(/\n/) && exts.some((ext) => script.endsWith(ext))) {
            script = script.trimStart();
            if (!isAbsolute(script)) {
                script = resolve(script);
            }
            return { file: script, generated: false };
        }

        const ext = exts.find((ext) => script.endsWith(ext)) ?? ".ts";
        const file = makeTempFileSync({
            prefix: "script_",
            suffix: ext,
        });

        writeTextFileSync(file, script);

        return { file, generated: false };
    }

    /**
     * Gets the tsx arguments for executing the typescript file.
     * @param script The typescript to execute.
     * @param isFile Specifies whether the script is a file or a command.
     * @returns The tsx arguments for executing the script.
     */
    // deno-lint-ignore no-unused-vars
    getShellArgs(script: string, isFile: boolean): string[] {
        const params = this.shellArgs ?? [];

        params.push(script);

        return params;
    }
}

/**
 * Executes the tsx command line using the TsxCliCommand class.
 * @param args The command arguments.
 * @param options The command options.
 * @returns a new instance of the TsxCliCommand class.
 */
export function tsxCli(args?: CommandArgs, options?: CommandOptions): TsxCliCommand {
    return new TsxCliCommand(args, options);
}

/**
 * Executes a typescript inline script or script file using the TsxShellCommand class.
 *
 * @param script - The type script code or file to execute.
 * @param options - Optional options for the tsx shell command.
 * @returns A new instance of the TsxShellCommand class.
 */
export function tsx(script: string, options?: ShellCommandOptions): TsxShellCommand {
    return new TsxShellCommand(script, options);
}
