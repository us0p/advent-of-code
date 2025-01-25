const assert = require("node:assert");
const fs = require("node:fs/promises");
const { describe, it, after } = require("node:test");
const { runner, runnerWithBot } = require("./003.js");

const TEST_FILE = "input-test.txt";

describe("Tests", () => {
  after(async () => {
    await fs.unlink(TEST_FILE);
  });

  describe("Testing runner function with SantaWritable", () => {
    it("Should visit two distinct houses", async () => {
      await fs.writeFile(TEST_FILE, ">");
      const actual = await runner(TEST_FILE);
      assert.strictEqual(actual, 2);
    });

    it("Should visit 4 distinct houses", async () => {
      await fs.writeFile(TEST_FILE, "^>v<");
      const actual = await runner(TEST_FILE);
      assert.strictEqual(actual, 4);
    });

    it("Should visit 2 distinct houses", async () => {
      await fs.writeFile(TEST_FILE, "^v^v^v^v^v");
      const actual = await runner(TEST_FILE);
      assert.strictEqual(actual, 2);
    });
  });

  describe("Testing runner function with SantaAndBotWritable", () => {
    it("Should visit 3 distinct houses", async () => {
      await fs.writeFile(TEST_FILE, "^v");
      const actual = await runnerWithBot(TEST_FILE);
      assert.strictEqual(actual, 3);
    });

    it("Should visit 3 distinct houses", async () => {
      await fs.writeFile(TEST_FILE, "^>v<");
      const actual = await runnerWithBot(TEST_FILE);
      assert.strictEqual(actual, 3);
    });

    it("Should visit 11 distinct houses", async () => {
      await fs.writeFile(TEST_FILE, "^v^v^v^v^v");
      const actual = await runnerWithBot(TEST_FILE);
      assert.strictEqual(actual, 11);
    });
  });
});
