/**
 * 堆排序思想
 * 步骤一：创建一个堆 H[0……n-1]；
 * 步骤二：把堆首（最大值）和堆尾互换；
 * 步骤三：把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置；
 * 步骤四：重复步骤 2，直到堆的尺寸为 1。
 */

const heapSort = arr => {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    // 首先将堆顶元素和数组当前最后一个元素进行互换
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 然后剩下需要重新进行堆调整的数组长度减少1
    len--;
    // 重新构造大顶堆
    heapify(arr, 0);
  }
  return arr;
};

let len = 0;

function buildMaxHeap(arr) {
  len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    // 建立大顶堆
    heapify(arr, i);
  }
}

function heapify(arr, i) { // 堆调整
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    // 不断将小的元素下沉到子节点
    heapify(arr, largest);
  }
}

module.exports = {
  heapSort
};
