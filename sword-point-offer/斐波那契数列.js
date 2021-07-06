/**
  写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
  F(0) = 0,   F(1) = 1
  F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
  斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

  答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

示例 1：
输入：n = 2
输出：1

示例 2：
输入：n = 5
输出：5
 *
 */


/**
 * 动态规划（自下向上）
 * @param {number} n
 * @return {number}
 */
const fib = n => {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; ++i) {
    const c = (a + b) % (1e9 + 7);
    a = b;
    b = c;
  }
  return a;
};

/**
 * 递归（尾递归）
 * @param {Number} n
 * @param {Number} current
 * @param {Number} next
 * @return {Number}
 */
const fib1 = (n, current = 0, next = 1) => {
  if (n === 0) return 0;
  if (n === 1) return next;
  return fib1(n - 1, next, current + next);
};

module.exports = {
  fib,
  fib1
};
