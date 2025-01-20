const fs = require("node:fs/promises");

/**
 * Calculates the destination floor based on the input string
 * @param {string} instructions
 * @returns {number}
 */
function getDestinationFloor(instructions) {
  let destinationFloor = 0;
  for (const instruction of instructions) {
    if (instruction == "(") {
      destinationFloor++;
      continue;
    }
    destinationFloor--;
  }
  return destinationFloor;
}

/**
 * Get the position of the instruction that first enters the basement, it's 1 indexed.
 * @param {string} instructions
 * @returns {number}
 */
function getStartOfBasementPosition(instructions) {
  let destinationFloor = 0;
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction == "(") destinationFloor++;
    if (instruction == ")") destinationFloor--;
    if (destinationFloor == -1) return i + 1;
  }
  return -1;
}

(async function () {
  const input = await fs.readFile("input.txt", { encoding: "utf8" });
  const destinationFloor = getDestinationFloor(input.trim());
  const startOfBasement = getStartOfBasementPosition(input.trim());
  console.log("The destination floor is:", destinationFloor);
  console.log("The start of basement is at position:", startOfBasement);
})();

module.exports = {
  getDestinationFloor,
  getStartOfBasementPosition,
};
