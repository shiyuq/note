const quickSort = (arr, start, end) => {
  if (end <= start) {
    return;
  }
  let index = partition(arr, start, end);
  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
  return arr;
};

function partition(arr, start, end) {
  // 以最后一个元素为基准
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // 交换元素
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // 移动到下一个元素
      pivotIndex++;
    }
  }

  // 把基准值放在中间
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

module.exports = {
  quickSort
};
