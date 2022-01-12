/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  // 二分查找
  let l = 0
  let r = x
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (mid ** 2 === x) return mid
    if (mid ** 2 < x) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return r
};
// @lc code=end

