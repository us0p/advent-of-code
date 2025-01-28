/**
 * @param {string} string
 * @return {boolean}
 */
function checkHasAtLeastThreeVowels(string) {
  const vowels = ["a", "e", "i", "o", "u"];
  let vowelCount = 0;
  for (const vowel of vowels) {
    for (const char of string) {
      if (char === vowel) vowelCount++;
    }
  }
  return vowelCount >= 3 ? true : false;
}

/**
 * @param {string} string
 * @return {boolean}
 */
function checkDuplicatedPairs(string) {
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] == string[i + 1]) return true;
  }
  return false;
}

/**
 * @param{string} string
 * @return {boolean}
 */
function checkMustNotExistPairs(string) {
  const mustNotExistPairs = ["ab", "cd", "pq", "xy"];
  for (pair of mustNotExistPairs) {
    if (string.includes(pair)) return false;
  }
  return true;
}

/**
 * @param {string} string
 * @return {boolean}
 */
function isNiceString(string) {
  const hasAtLeastTreeVowels = checkHasAtLeastThreeVowels(string);
  const hasDuplicate = checkDuplicatedPairs(string);
  const dontHavePairs = checkMustNotExistPairs(string);
  if (hasAtLeastTreeVowels && hasDuplicate && dontHavePairs) return true;
  return false;
}

module.exports = {
  isNiceString,
  checkHasAtLeastThreeVowels,
  checkDuplicatedPairs,
  checkMustNotExistPairs,
};
