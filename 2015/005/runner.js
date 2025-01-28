const fs = require("node:fs/promises");
const { isNiceString } = require("./005");

async function runner() {
  const file = await fs.open("input.txt", "r");
  let niceStringsCount = 0;
  for await (const line of file.readLines()) {
    if (isNiceString(line.trim())) niceStringsCount++;
  }
  await file.close();
  console.log(niceStringsCount);
}

runner();
