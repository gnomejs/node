import { Command, type CommandArgs, type CommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";

pathFinder.set("yarn", {
    name: "yarn",
    windows: [
        ".\\node_modules\\.bin\\yarn.cmd",
        "${APPDATA}\\npm\\yarn.cmd",
        "${APPDATALOCAL}\\nvs\\default\\yarn.cmd",
    ],
    linux: [
        "/usr/bin/yarn",
        "${HOME}/.nvs/default/bin/yarn",
    ],
});

/**
 * Represents a yarn command.
 */
export class YarnCommand extends Command {
    /**
     * Creates a new instance of the `YarnCommand` class.
     * @param args The command arguments.
     * @param options The command options.
     */
    constructor(args?: CommandArgs, options?: CommandOptions) {
        super("yarn", args, options);
    }
}

/**
 * Executes the yarn command line using the YarnCommand class.
 * @param args The command arguments.
 * @param options The command options.
 * @returns a new instance of the YarnCommand class.
 */
export function yarn(args?: CommandArgs, options?: CommandOptions): YarnCommand {
    return new YarnCommand(args, options);
}
