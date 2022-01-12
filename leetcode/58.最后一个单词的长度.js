/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let length = 0
  let tag = false
  const sl = s.length
  if (s[sl - 1] !== ' ') tag = true
  for (i = sl - 1; i >= 0; i--) {
    if (tag) {
      if (s[i] === ' ') {
        return length
      } else {
        length++
      }
    } else {
      if (s[i] !== ' ') {
        tag = true
        length++
      }
    }
  }
  return length
};
// @lc code=end

