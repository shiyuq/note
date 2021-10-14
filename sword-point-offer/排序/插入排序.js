/**
 * 插入排序思想
 * 步骤一：找到元素应该插入的位置，然后插入
 * 步骤二：对应比当前元素大的进行右移
 * @param {*} arr
 */
const insertSort = arr => {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
};

module.exports = {
  insertSort
};
