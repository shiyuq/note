/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const max = Math.pow(2, 31) - 1;
  const min = -Math.pow(2, 31);
  let y = 0;
  while (x !== 0) {
    y = 10 * y + x % 10;
    // ~~ 取整
    x = ~~(x / 10);
  }
  if (y > max) return 0;
  if (y < min) return 0;
  return y;
};
// @lc code=end

