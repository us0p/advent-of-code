const crypto = require("node:crypto");

// find the lowest positive integer to produce a hash with at least 5
// leading zeroes given the SECRET KEY.

/**
 * @param {string} value
 * @returns {string}
 */
function produceMD5Hash(value) {
  const hash = crypto.createHash("MD5");
  hash.update(value);
  return hash.digest("hex");
}

/**
 * Yields the lowest positive integer to produce a hash with at least 5
 * leading zeroes for a guiven key
 * @param {string} key
 * @param {string} startsWith
 * @returns {number}
 */
function mineKey(key, startsWith) {
  let positiveInteger = 1;
  while (true) {
    const value = `${key}${positiveInteger}`;
    const hash = produceMD5Hash(value);
    if (hash.startsWith(startsWith)) return positiveInteger;
    positiveInteger += 1;
  }
}

module.exports = {
  mineKey,
};
