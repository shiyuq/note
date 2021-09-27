/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (!strs.length) return ''
  let prefix = strs.shift()
  let len = prefix.length
  for (let i = 0; i < strs.length; i++) {
    len = len < strs[i].length ? len :strs[i].length
    if (len === 0) return ''
    for (let j = 0; j <= len; j++) {
      if (prefix[j] !== strs[i][j]) {
        prefix = prefix.slice(0, j)
        if (!prefix.length) return ''
      }
    }
  }
  return prefix
};
// @lc code=end

