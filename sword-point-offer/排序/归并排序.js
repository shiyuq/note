/**
 * 归并排序思想
 * 递归（分治）
 * @param {*} arr
 * @returns
 */
const mergeSort = arr => {
  const len = arr.length;
  if (len <= 1) return arr;
  const middle = Math.floor(len / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  if (left.length) {
    result = [...result, ...left];
  }
  if (right.length) {
    result = [...result, ...right];
  }

  return result;
}

module.exports = {
  mergeSort
};
