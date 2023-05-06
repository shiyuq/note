/**
 * 需求：
 * 新建一个文件，座右铭.txt，写入内容：三人行，必有我师焉
 */

// 1：导入 fs 模块
const fs = require('fs');

// 2：写入文件
// fs.writeFile('./座右铭.txt', '三人行，必有我师焉', err => {
//   console.log('err1111111 :>> ', err);
// });

// console.log('2222222222 :>> ', 1 + 1);

// 上面的是异步写入，首先输出2，再输出err

// 这里是同步的
fs.writeFileSync('./data.txt', '测试');
