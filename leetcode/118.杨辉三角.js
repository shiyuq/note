/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  // 本行的值 = 上一行的值左移一位和上一行的值相加
  const res = [[1]]
  for (let i = 1; i < numRows; i++) {
    const temp = []
    const arr1 = [...res[res.length - 1], 0]
    const arr2 = [0, ...res[res.length - 1]]
    for (let j = 0; j < arr1.length; j++) {
      temp.push(arr1[j] + arr2[j])
    }
    res.push(temp)
  }
  return res
};
// @lc code=end

