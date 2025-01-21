const assert = require("node:assert");
const { describe, it } = require("node:test");

const { getDestinationFloor, getStartOfBasementPosition } = require("./001.js");

describe("Testing getDestinationFloor", () => {
  it("(()) outputs 0", () => {
    const destination = getDestinationFloor("(())");
    assert.strictEqual(destination, 0);
  });

  it("()() outputs 0", () => {
    const destination = getDestinationFloor("()()");
    assert.strictEqual(destination, 0);
  });

  it("((( outputs 3", () => {
    const destination = getDestinationFloor("(((");
    assert.strictEqual(destination, 3);
  });

  it("(()(()( outputs 3", () => {
    const destination = getDestinationFloor("(()(()(");
    assert.strictEqual(destination, 3);
  });

  it("))((((( outputs 3", () => {
    const destination = getDestinationFloor("))(((((");
    assert.strictEqual(destination, 3);
  });

  it("()) outputs -1", () => {
    const destination = getDestinationFloor("())");
    assert.strictEqual(destination, -1);
  });

  it("))( outputs -1", () => {
    const destination = getDestinationFloor("))(");
    assert.strictEqual(destination, -1);
  });

  it("))) outputs -3", () => {
    const destination = getDestinationFloor(")))");
    assert.strictEqual(destination, -3);
  });

  it(")())()) outputs -3", () => {
    const destination = getDestinationFloor(")())())");
    assert.strictEqual(destination, -3);
  });
});

describe("Testing getStartOfBasementPosition", () => {
  it("(()) outputs -1", () => {
    const startOfBasement = getStartOfBasementPosition("(())");
    assert.strictEqual(startOfBasement, -1);
  });

  it("()() outputs -1", () => {
    const startOfBasement = getStartOfBasementPosition("()()");
    assert.strictEqual(startOfBasement, -1);
  });

  it("((( outputs -1", () => {
    const startOfBasement = getStartOfBasementPosition("(((");
    assert.strictEqual(startOfBasement, -1);
  });

  it("(()(()( outputs -1", () => {
    const startOfBasement = getStartOfBasementPosition("(()(()(");
    assert.strictEqual(startOfBasement, -1);
  });

  it("))((((( outputs 1", () => {
    const startOfBasement = getStartOfBasementPosition("))(((((");
    assert.strictEqual(startOfBasement, 1);
  });

  it("()) outputs 3", () => {
    const startOfBasement = getStartOfBasementPosition("())");
    assert.strictEqual(startOfBasement, 3);
  });

  it("))( outputs 1", () => {
    const startOfBasement = getStartOfBasementPosition("))(");
    assert.strictEqual(startOfBasement, 1);
  });

  it("))) outputs 1", () => {
    const startOfBasement = getStartOfBasementPosition(")))");
    assert.strictEqual(startOfBasement, 1);
  });

  it(")())()) outputs 1", () => {
    const startOfBasement = getStartOfBasementPosition(")())())");
    assert.strictEqual(startOfBasement, 1);
  });
});
