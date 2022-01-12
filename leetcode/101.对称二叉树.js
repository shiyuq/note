/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
var isSymmetric = function(root) {
  let check = (p, q) => {
    // 左右子节点同时为空
    if (p == null && q == null) return true;
    // 左右子节点有一个为空的情况
    if (p == null || q == null) return false;
    // 每个树的右子树都与这棵树的左子树镜像对称
    return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
  };
  return check(root, root);
};
// @lc code=end

