/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let i = digits.length - 1
  while (i >= 0) {
    if (digits[i] + 1 !== 10) {
      digits[i] += 1
      return digits
    }
    digits[i] = 0
    i -= 1
  }
  return digits[0] === 0 ? [1, ...digits] : digits
};
// @lc code=end

