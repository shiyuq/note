/**
 * 选择排序思想
 * 步骤一：每次都找到数组中最小的元素，然后放到元素首位
 * 步骤二：首位的元素不需要动，接着对接下来的 n-1 个元素进行步骤一的操作
 * @param {*} arr
 */
const selectionSort = arr => {
  const len = arr.length;
  // 这里最外层只需要遍历到 （len - 2） 位置就可以了
  // 子循环会比较倒数第二个元素和最后一个元素的大小并交换位置，最后一个元素自然是最大的
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 找到最小元素的索引
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};

module.exports = {
  selectionSort
};
