/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  let arr = [1]
  for (i = 0; i < rowIndex; i++) {
    const arr1 = [...arr, 0]
    const arr2 = [0, ...arr]
    for (j = 0; j < arr1.length; j++) {
      arr[j] = arr1[j] + arr2[j]
    }
  }
  return arr
};
// @lc code=end

