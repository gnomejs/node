import { node, nodeCli } from "./node.ts"
import { assertEquals as equals, assert as ok } from "jsr:@std/assert@0.225.3"

const EOL = Deno.build.os === "windows" ? "\r\n" : "\n";

Deno.test("node", async () => {
    const result = await node("console.log('Hello, World!');");
    equals(await result.text(), `Hello, World!${EOL}`);
    equals(result.code, 0)
});

Deno.test("nodeCli", async () => {
    const result = await nodeCli("--version");
    equals(result.code, 0);
    ok(result.text().startsWith("v"));
});
