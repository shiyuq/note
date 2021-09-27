/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false
  const max = Math.pow(2, 31) - 1;
  const min = -Math.pow(2, 31);
  if (min >= x || x >= max) return false
  if (x < 0 || (x !== 0 && x % 10 === 0)) return false
  let x1 = x;
  let y = 0;
  while (x !== 0) {
    y = 10 * y + x % 10;
    // ~~ 取整
    x = ~~(x / 10);
  }
  return y === x1;
};
// @lc code=end

