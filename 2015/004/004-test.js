const assert = require("node:assert");
const { describe, it } = require("node:test");
const { mineKey } = require("./004");

describe("Testing minning", () => {
  it("should yield 609043 for hash starting with 5 zeroes and key abcdef", () => {
    const actual = mineKey("abcdef", "00000");
    assert.strictEqual(actual, 609043);
  });

  it("should yield 1048970 for hash starting with 5 zeroes and key pqrstuv", () => {
    const actual = mineKey("pqrstuv", "00000");
    assert.strictEqual(actual, 1048970);
  });
});
