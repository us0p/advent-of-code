const { mineKey } = require("./004");

const SECRET_KEY = "yzbqklnj";

function runner() {
  const lowestPositiveIntegerFiveZeroes = mineKey(SECRET_KEY, "00000");
  const lowestPositiveIntegerSixZeroes = mineKey(SECRET_KEY, "000000");
  console.log(lowestPositiveIntegerFiveZeroes, lowestPositiveIntegerSixZeroes);
}

runner();
