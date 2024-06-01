import { node, nodeCli } from "./cli.ts";
import { remove, writeTextFile } from "@gnome/fs";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";

Deno.test("node", async () => {
    const result = await node("console.log('Hello, World!');");
    equals(await result.text(), `Hello, World!\n`);
    equals(result.code, 0);
});

Deno.test("nodeCli", async () => {
    const result = await nodeCli("--version");
    equals(result.code, 0);
    ok(result.text().startsWith("v"));
});

Deno.test("files", async () => {
    const script = `console.log('Hello, World!');`;
    await writeTextFile("test.js", script);
    await writeTextFile("test.mjs", script);
    await writeTextFile("test.cjs", script);

    try {
        const result = await node("test.js");
        equals(await result.text(), `Hello, World!\n`);
        equals(result.code, 0);

        const result2 = await node("test.mjs");
        equals(await result2.text(), `Hello, World!\n`);
        equals(result2.code, 0);

        const result3 = await node("test.cjs");
        equals(await result3.text(), `Hello, World!\n`);
        equals(result3.code, 0);
    } finally {
        await remove("test.js");
        await remove("test.mjs");
        await remove("test.cjs");
    }
});
