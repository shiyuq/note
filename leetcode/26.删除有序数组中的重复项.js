/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  const len = nums.length
  if (len === 0) return 0
  // 慢指针 slow，记录非重复数组的长度
  let slow = 0
  // 快指针 fast，遍历数组元素
  for (let fast = 1; fast < len; fast++) {
    if (nums[slow] !== nums[fast]) {
      slow++
      nums[slow] = nums[fast]
    }
  }
  return slow + 1
};
// @lc code=end

