import { yarn } from "./yarn.ts";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";
import { pathFinder } from "@gnome/exec/path-finder";

const hasYarn = pathFinder.findExeSync("yarn") !== undefined;

Deno.test(
    {
        name: "yarn",
        ignore: !hasYarn,
        fn: async () => {
            const result = await yarn("run holdor", { cwd: "./resources" });
            equals(result.code, 0);
            ok(result.text().includes("holdor"));
        },
    },
);
