import { pnpm } from "./pnpm.ts";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";
import { pathFinder } from "@gnome/exec/path-finder";

const hasPnpm = pathFinder.findExeSync("pnpm") !== undefined;

Deno.test(
    {
        name: "pnpm",
        ignore: !hasPnpm,
        fn: async () => {
            const result = await pnpm("run holdor", { cwd: "./resources" });
            equals(result.code, 0);
            ok(result.text().includes("holdor"));
        },
    },
);
