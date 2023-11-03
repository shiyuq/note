### 微任务和宏任务
#### 微任务
* process.nextTick(nextTick始终是优于其他微任务执行)
* Promise.then catch finally

#### 宏任务
* I/O
* setTimeout(早于setImmediate执行)
* setInterval
* setImmediate
