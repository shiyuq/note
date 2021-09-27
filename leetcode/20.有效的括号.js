/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const n = s.length
  // 如果是奇数个，直接返回false
  if (n % 2 === 1) {
      return false
  }
  // 构造 Map
  const pairs = new Map([
      [')', '('],
      [']', '['],
      ['}', '{']
  ])
  const stack = []
  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stack.length || stack[stack.length - 1] !== pairs.get(ch)) {
        return false
      }
      stack.pop()
    } else {
      stack.push(ch)
    }
  }
  return !stack.length
};
// @lc code=end

