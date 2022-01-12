/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  // 解法1：采用递归
  // if (n === 1) return 1
  // if (n === 2) return 2
  // return climbStairs(n - 1) + climbStairs(n - 2)

  // 解法2：采用动态规划
  let p = 0, q = 0, r = 1
  for (let i = 1; i <= n; i++) {
    p = q
    q = r
    r = p + q
  }
  return r
};
// @lc code=end

