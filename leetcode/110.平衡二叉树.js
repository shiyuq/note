/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  // 方案一
  // let flag = true
  // const maxDepth = root => {
  //   if (root === null) return 0
  //   let leftMaxDepth = maxDepth(root.left)
  //   let rightMaxDepth = maxDepth(root.right)
  //   if (Math.abs(leftMaxDepth - rightMaxDepth) > 1) {
  //     flag = false
  //   }
  //   return 1 + Math.max(leftMaxDepth, rightMaxDepth)
  // }
  // maxDepth(root)
  // return flag

  // 方案二
  function depth (node) {
    if (!node) return 0
    const left = depth(node.left)
    const right = depth(node.right)
    return Math.max(left, right) + 1
  }
  if (!root) return true
  if (Math.abs(depth(root.left) - depth(root.right)) > 1) return false
  return isBalanced(root.left) && isBalanced(root.right)
};
// @lc code=end

