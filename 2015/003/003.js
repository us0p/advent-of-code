const fs = require("node:fs/promises");
const { Writable } = require("node:stream");
const streams = require("node:stream/promises");

/**
 * Represents the position in the x,y axis.
 * @typedef {Object} XYPair
 * @property {number} x
 * @property {number} y
 */

/**
 * Represents all the possible instructions
 * @typedef {'^'|'>'|'v'|'<'} Instruction
 */

/**
 * Returns the x,y variation based on the instruction input.
 * @param {Instruction} instruction
 * @returns {XYPair}
 */
function yieldPosition(instruction) {
  switch (instruction) {
    case "^":
      return { x: 0, y: 1 };
    case ">":
      return { x: 1, y: 0 };
    case "v":
      return { x: 0, y: -1 };
    case "<":
      return { x: -1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

class SantaWritable extends Writable {
  constructor(options, fn) {
    super(options);
    this.fn = fn;
    this.position = { x: 0, y: 0 };
    this.map = new Map();
    this.map.set("0x0", true);
  }

  _write(chunk, _, cb) {
    const instruction = chunk.toString("utf-8");
    const position = this.fn(instruction);
    this.position.x += position.x;
    this.position.y += position.y;
    const positionStrRepresentation = `${this.position.x}x${this.position.y}`;
    if (!this.map.get(positionStrRepresentation)) {
      this.map.set(positionStrRepresentation, true);
    }
    cb(null, chunk);
  }
}

class SantaAndBotWritable extends Writable {
  constructor(options, fn) {
    super(options);
    this.fn = fn;
    this.santaPosition = { x: 0, y: 0 };
    this.santaMap = new Map();
    this.santaBotPosition = { x: 0, y: 0 };
    this.santaBotMap = new Map();
    this.santaMap.set("0x0", true);
    this.santaBotMap.set("0x0", true);
    this.round = 0;
  }

  _write(chunk, _, cb) {
    const instruction = chunk.toString("utf-8");
    const position = this.fn(instruction);
    if (this.round % 2 == 0) {
      this.santaPosition.x += position.x;
      this.santaPosition.y += position.y;
      const positionStrRepresentatin = `${this.santaPosition.x}x${this.santaPosition.y}`;
      if (
        !this.santaMap.get(positionStrRepresentatin) &&
        !this.santaBotMap.get(positionStrRepresentatin)
      )
        this.santaMap.set(positionStrRepresentatin, true);
    } else {
      this.santaBotPosition.x += position.x;
      this.santaBotPosition.y += position.y;
      const positionStrRepresentatin = `${this.santaBotPosition.x}x${this.santaBotPosition.y}`;
      if (
        !this.santaMap.get(positionStrRepresentatin) &&
        !this.santaBotMap.get(positionStrRepresentatin)
      )
        this.santaBotMap.set(positionStrRepresentatin, true);
    }
    this.round += 1;
    cb(null, chunk);
  }
}

async function runner(filePath) {
  const file = await fs.open(filePath, "r");
  const fileStream = file.createReadStream({
    encoding: "utf-8",
    highWaterMark: 1,
  });
  const writable = new SantaWritable({}, yieldPosition);
  await streams.pipeline(fileStream, writable);
  return writable.map.size;
}

async function runnerWithBot(filePath) {
  const file = await fs.open(filePath, "r");
  const fileStream = file.createReadStream({
    encoding: "utf-8",
    highWaterMark: 1,
  });
  const writable = new SantaAndBotWritable({}, yieldPosition);
  await streams.pipeline(fileStream, writable);
  return writable.santaMap.size + writable.santaBotMap.size - 1;
}

async function driver() {
  const INPUT_FILE = "input.txt";
  const distinctHouses = await runner(INPUT_FILE);
  const distinctHousesWithBot = await runnerWithBot(INPUT_FILE);

  console.log(distinctHouses, distinctHousesWithBot);
}

driver();

module.exports = { runner, runnerWithBot };
