import { dirname, fromFileUrl, join, resolve } from "@std/path";
import { npm } from "./cli.ts";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";

Deno.test("npm run", async () => {
    const dir = dirname(fromFileUrl(import.meta.url));
    const resources = resolve(join(dir, "..", "resources"));

    const result = await npm("run holdor", { cwd: resources });
    equals(result.code, 0);
    ok(result.text().includes("holdor"));
});
