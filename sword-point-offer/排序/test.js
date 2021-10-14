const quickSort = require('./快速排序');
const bubbleSort = require('./冒泡排序');
const selectionSort = require('./选择排序');
const insertionSort = require('./插入排序');
const heapSort = require('./堆排序');
const mergeSort = require('./归并排序');

const arr = [5, 3, 4, 7, 6, 2, 9, 1, 8];
let result = null;

result = quickSort.quickSort(arr, 0, arr.length - 1);
result = bubbleSort.bubbleSort(arr);
result = selectionSort.selectionSort(arr);
result = insertionSort.insertSort(arr);
result = heapSort.heapSort(arr);
result = mergeSort.mergeSort(arr);

console.log('result :>> ', result);
