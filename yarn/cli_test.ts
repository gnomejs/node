import { yarn } from "./cli.ts";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";
import { pathFinder } from "@gnome/exec/path-finder";
import { dirname, fromFileUrl, join, resolve } from "@std/path";

const hasYarn = pathFinder.findExeSync("yarn") !== undefined;

Deno.test(
    {
        name: "yarn",
        ignore: !hasYarn,
        fn: async () => {
            const dir = dirname(fromFileUrl(import.meta.url));
            const resources = resolve(join(dir, "..", "resources"));
            const result = await yarn("run holdor", { cwd: resources });
            equals(result.code, 0);
            ok(result.text().includes("holdor"));
        },
    },
);
