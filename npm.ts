import { Command, type CommandArgs, type CommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";

pathFinder.set("npm", {
    name: "npm",
    windows: [
        "${ProgramFiles}\\nodejs\\npm.cmd",
        "${APPDATALOCAL}\\nvs\\default\\npm.cmd",
    ],
    linux: [
        "/usr/bin/npm",
        "${HOME}/.nvs/default/bin/npm",
    ],
});

/**
 * Represents a Npm command.
 */
export class NpmCommand extends Command {
    /**
     * Creates a new instance of the `NpmCommand` class.
     * @param args The command arguments.
     * @param options The command options.
     */
    constructor(args?: CommandArgs, options?: CommandOptions) {
        super("npm", args, options);
    }
}

/**
 * Executes the npm command line using the NpmCommand class.
 * @param args The command arguments.
 * @param options The command options.
 * @returns a new instance of the NpmCommand class.
 */
export function npm(args?: CommandArgs, options?: CommandOptions): NpmCommand {
    return new NpmCommand(args, options);
}
