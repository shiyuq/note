/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  const len = nums.length
  if (len === 0) return 0
  // 慢指针 slow，记录数组的长度
  let slow = 0
  // 快指针 fast，遍历数组元素
  for (let fast = 0; fast < len; fast++) {
    if (val !== nums[fast]) {
      nums[slow] = nums[fast]
      slow++
    }
  }
  return slow
};
// @lc code=end

