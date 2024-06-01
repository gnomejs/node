import { tsx, tsxCli } from "./tsx.ts";
import { remove, writeTextFile } from "@gnome/fs";
import { pathFinder } from "jsr:@gnome/exec@^0.4.1/path-finder";
import { assert as ok, assertEquals as equals } from "jsr:@std/assert@0.225.3";

const EOL = Deno.build.os === "windows" ? "\r\n" : "\n";
const hasTsx = pathFinder.findExeSync("tsx") !== undefined;

Deno.test({
    name: "tsx",
    ignore: !hasTsx,
    fn: async () => {
        const result = await tsx("console.log('Hello, World!');");
        equals(await result.text(), `Hello, World!${EOL}`);
        equals(result.code, 0);
    },
});

Deno.test(
    {
        name: "tsxCli",
        ignore: !hasTsx,
        fn: async () => {
            const result = await tsxCli("--version");
            equals(result.code, 0);
            ok(result.text().startsWith("tsx"));
        },
    },
);

Deno.test({
    name: "tsx files",
    ignore: !hasTsx,
    fn: async () => {
        const script = `console.log('Hello, World!');`;
        await writeTextFile("test.ts", script);
        await writeTextFile("test.mts", script);
        await writeTextFile("test.cts", script);

        try {
            const result = await tsx("test.ts");
            equals(await result.text(), `Hello, World!${EOL}`);
            equals(result.code, 0);

            const result2 = await tsx("test.mts");
            equals(await result2.text(), `Hello, World!${EOL}`);
            equals(result2.code, 0);

            const result3 = await tsx("test.cts");
            equals(await result3.text(), `Hello, World!${EOL}`);
            equals(result3.code, 0);
        } finally {
            await remove("test.ts");
            await remove("test.mts");
            await remove("test.cts");
        }
    },
});
