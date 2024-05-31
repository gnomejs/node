import { Command, type CommandArgs, type CommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";

pathFinder.set("npx", {
    name: "npx",
    windows: [
        "${ProgramFiles}\\nodejs\\npx.cmd",
        "${APPDATALOCAL}\\nvs\\default\\npx.cmd",
    ],
    linux: [
        "/usr/bin/npx",
        "${HOME}/.nvs/default/bin/npx",
    ],
});

/**
 * Represents a Pip command.
 */
export class NpxCommand extends Command {
    /**
     * Creates a new instance of the `PipCommand` class.
     * @param args The command arguments.
     * @param options The command options.
     */
    constructor(args?: CommandArgs, options?: CommandOptions) {
        super("npx", args, options);
    }
}

/**
 * Executes the npx command line using the NpxCommand class.
 * @param args The command arguments.
 * @param options The command options.
 * @returns a new instance of the NpxCommand class.
 */
export function npx(args?: CommandArgs, options?: CommandOptions): NpxCommand {
    return new NpxCommand(args, options);
}
