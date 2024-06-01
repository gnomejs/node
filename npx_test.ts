import { npx } from "./npx.ts"
import { assertEquals as equals } from "jsr:@std/assert@0.225.3"

Deno.test("cowsay", async ()=> {
    const result = await npx("cowsay hello", {cwd: "./resources" });
    equals(result.code, 0);
    console.log(result.text());
})