/**
 * 冒泡思想
 * 步骤1：每次都和相邻的元素比较大小，并交换位置
 * 步骤2：直到将最大的元素冒泡到数组的末尾，结束一轮冒泡
 * 步骤3：不需要再对数组最后一个元素进行冒泡，再次进行一轮冒泡
 * 步骤4：循环步骤1，2
 * @param {*} arr
 * @returns
 */
const bubbleSort = (arr) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

module.exports = {
  bubbleSort
};
