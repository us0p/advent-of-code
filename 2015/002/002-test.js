const assert = require("node:assert");
const { describe, it, before, after } = require("node:test");
const fs = require("node:fs/promises");

const { Prism, getPrismsFromInputFile } = require("./002.js");

describe("Testing Prism class", () => {
  it("should instantiate a proper prism object", () => {
    const prism = new Prism(1, 2, 3);
    assert.strictEqual(prism.l, 1);
    assert.strictEqual(prism.w, 2);
    assert.strictEqual(prism.h, 3);
  });

  it("should return the smallest perimeter for the provided prism", () => {
    const prism = new Prism(2, 3, 4);
    const smallestPerimeter = prism.getSmallestPerimeter();
    assert.strictEqual(smallestPerimeter, 10);
  });

  it("should return the smallest area", () => {
    const prism = new Prism(2, 3, 4);
    const smallestArea = prism.getSmallestArea();
    assert.strictEqual(smallestArea, 6);
  });

  it("should return the wrapping paper dimensions", () => {
    const prism = new Prism(2, 3, 4);
    const wrappingPaperDimensions = prism.getWrappingDimensions();
    assert.strictEqual(wrappingPaperDimensions, 58);
  });

  it("should return the ribbon length required", () => {
    const prism = new Prism(2, 3, 4);
    const ribbonLength = prism.getRibbonLength();
    assert.strictEqual(ribbonLength, 34);
  });
});

describe("Testing getPrismsFromInputFile", () => {
  const inputFile = "testInputFile.txt";
  before(async () => {
    const file = await fs.open(inputFile, "w");
    await file.write("3x11x24\n13x5x19\n1x9x27", null, "utf-8");
    await file.close();
  });

  after(async () => {
    await fs.unlink(inputFile);
  });

  it("should create an array of prisms by reading input file lines", async () => {
    const prisms = await getPrismsFromInputFile(inputFile);
    assert.strictEqual(prisms.length, 3);
    const basePrism = prisms[0];
    assert.strictEqual(typeof basePrism.l, "number");
    assert.strictEqual(typeof basePrism.w, "number");
    assert.strictEqual(typeof basePrism.h, "number");
  });
});
