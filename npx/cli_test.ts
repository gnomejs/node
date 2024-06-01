import { dirname, fromFileUrl, join, resolve } from "@std/path";
import { npx } from "./cli.ts";
import { assertEquals as equals } from "jsr:@std/assert@0.225.3";

Deno.test("cowsay", async () => {
    const dir = dirname(fromFileUrl(import.meta.url));
    const resources = resolve(join(dir, "..", "resources"));

    const result = await npx("cowsay hello", { cwd: resources });
    equals(result.code, 0);
    console.log(result.text());
});
