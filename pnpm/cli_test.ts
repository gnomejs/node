import { pnpm } from "./cli.ts";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";
import { pathFinder } from "@gnome/exec/path-finder";
import { dirname, fromFileUrl, join, resolve } from "@std/path";

const hasPnpm = pathFinder.findExeSync("pnpm") !== undefined;

Deno.test(
    {
        name: "pnpm",
        ignore: !hasPnpm,
        fn: async () => {
            const dir = dirname(fromFileUrl(import.meta.url));
            const resources = resolve(join(dir, "..", "resources"));

            const result = await pnpm("run holdor", { cwd: resources });
            equals(result.code, 0);
            ok(result.text().includes("holdor"));
        },
    },
);
