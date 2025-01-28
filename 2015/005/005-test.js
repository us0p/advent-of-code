const assert = require("node:assert");
const { describe, it } = require("node:test");

const {
  isNiceString,
  checkMustNotExistPairs,
  checkDuplicatedPairs,
  checkHasAtLeastThreeVowels,
} = require("./005");

describe("Testing checkHasAtLeastThreeVowels", () => {
  it("Should return true for aaa", () => {
    const actual = checkHasAtLeastThreeVowels("aaa");
    assert.strictEqual(actual, true);
  });

  it("Should return false for abe", () => {
    const actual = checkHasAtLeastThreeVowels("abe");
    assert.strictEqual(actual, false);
  });
});

describe("Testing checkDuplicatedPairs", () => {
  it("Should return true for ugknbfddgicrmopn", () => {
    const actual = checkDuplicatedPairs("ugknbfddgicrmopn");
    assert.strictEqual(actual, true);
  });

  it("Should return true for ugknbfaagicrmopn", () => {
    const actual = checkDuplicatedPairs("ugknbfaagicrmopn");
    assert.strictEqual(actual, true);
  });

  it("Should return true for ugknbfbbgicrmopn", () => {
    const actual = checkDuplicatedPairs("ugknbfbbgicrmopn");
    assert.strictEqual(actual, true);
  });

  it("Should return true for ugknbfccgicrmopn", () => {
    const actual = checkDuplicatedPairs("ugknbfccgicrmopn");
    assert.strictEqual(actual, true);
  });

  it("Should return false for ugknbfasgicrmopn", () => {
    const actual = checkDuplicatedPairs("ugknbfasgicrmopn");
    assert.strictEqual(actual, false);
  });
});

describe("Testing checkMustNotExistPairs", () => {
  it("Should return false for haegwjzuvuyypxyu", () => {
    const actual = checkMustNotExistPairs("haegwjzuvuyypxyu");
    assert.strictEqual(actual, false);
  });

  it("Should return false for haegwjzuvuyypabu", () => {
    const actual = checkMustNotExistPairs("haegwjzuvuyypabu");
    assert.strictEqual(actual, false);
  });

  it("Should return false for haegwjzuvuyypcdu", () => {
    const actual = checkMustNotExistPairs("haegwjzuvuyypcdu");
    assert.strictEqual(actual, false);
  });

  it("Should return false for haegwjzuvuyyppqu", () => {
    const actual = checkMustNotExistPairs("haegwjzuvuyyppqu");
    assert.strictEqual(actual, false);
  });

  it("Should return true for haegwjzuvuyyppau", () => {
    const actual = checkMustNotExistPairs("haegwjzuvuyyppau");
    assert.strictEqual(actual, true);
  });
});

describe("Testing isNiceString", () => {
  it("Should return true for ugknbfddgicrmopn", () => {
    const actual = isNiceString("ugknbfddgicrmopn");
    assert.strictEqual(actual, true);
  });

  it("Should return true for aaa", () => {
    const actual = isNiceString("aaa");
    assert.strictEqual(actual, true);
  });

  it("Should return false for jchzalrnumimnmhp", () => {
    const actual = isNiceString("jchzalrnumimnmhp");
    assert.strictEqual(actual, false);
  });

  it("Should return false for haegwjzuvuyypxyu", () => {
    const actual = isNiceString("haegwjzuvuyypxyu");
    assert.strictEqual(actual, false);
  });

  it("Should return false for dvszwmarrgswjxmb", () => {
    const actual = isNiceString("dvszwmarrgswjxmb");
    assert.strictEqual(actual, false);
  });
});
