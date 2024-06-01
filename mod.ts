/**
 * ## Overview
 *
 * The `node-cli` module provides a simple way to execute
 * inline Javascript or JavaScript files.
 *
 * The module relies upon the @gnome/exec module and
 * has the same basic usage as the `Command` and `ShellCommand` class.
 *
 * ## Basic Usage
 *
 * ```typescript
 * import { node } from "@gnome/node-cli";
 *
 * const cmd = node("console.log('Hello, World!');");
 *
 * // execute the node command and writes "Hello, World!" to stdout.
 * await cmd.run();
 *
 * // run a script and writes output to stdout and stderr.
 * await node("./test.js").run();
 *
 * const r = await node("console.log('Hello, World!');");
 * console.log(r.code);
 * console.log(r.text());
 * ```
 * [MIT License](./LICENSE.md)
 * @module
 */
export * from "./node.ts";
export * from "./npm.ts";
export * from "./npx.ts";
export * from "./pnpm.ts";
export * from "./tsx.ts";
export * from "./yarn.ts";
