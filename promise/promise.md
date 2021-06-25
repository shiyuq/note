## 👉 期约与异步函数

### 👉 什么是 Promise
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

### 👉 Promise 的特点
* 优点
  * 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
  * 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
* 缺点
  * Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 👉 使用方法
`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
const promise = new Promise((resolve, reject) => {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

// 这里的 resolve 和 reject 是两个函数，由 JavaScript 引擎提供，不用自己部署。
// resolve：将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），将异步操作的结果，作为参数传递出去
// reject：将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），将异步操作的错误，作为参数传递出去
```

`promise`实例生成之后，可以使用`then`方法来分别指定`resolved`状态和`rejected`状态的回调函数。

```javascript
promise.then(
    value => {
        // success
    },
    error => {
        // failure
    }
)

// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为resolved时调用
// 第二个回调函数是Promise对象的状态变为rejected时调用
// 这两个函数都是可选的，不一定要提供。它们都接收Promise对象传出的值作为参数
```

下面是一个`Promise`对象的简单例子。
```javascript
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}

timeout(100).then(value => {
    console.log(value);
})

// 上面的代码中，timeout 方法返回的是一个 Promise 实例，表示一段时间之后才会发生的结果，过了指定的（ms）时间后，会执行 resolve('done')，就会触发then方法绑定的回调函数
```

`Promise`新建之后就会立即执行。
```javascript
const promise = new Promise((resolve, reject) => {
    console.log('Promise');
    resolve();
})

promise.then(() => {
    console.log('resolved.');
})

console.log('Hi!');

// 执行顺序如下
// Promise
// Hi!
// resolved.

// Promise被新建之后立即执行，率先打印出Promise，然后then方法属于微任务，所以会在Promise状态是非pending的时候，回调会成为Promise Jobs，也就是微任务，进入微任务队列中等待当前宏任务执行完成再继续执行，所以接着打印出了Hi!，最后宏任务结束了，发现微任务队列中有一个then的回调，打印resolved.
```

### 👉 Promise.prototype.then()
`Promise` 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 `Promise` 实例添加状态改变时的回调函数。`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。

then方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

```javascript
const promise = new Promise((resolve, reject) => {
    resolve('done');
}).then(value => {
    return `${value} again`;
}).then(value => {
    console.log(value);
})

// done again

// 上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

// 上面没有考虑到异步操作可能失败的情况
const promise = new Promise((resolve, reject) => {
    resolve('done');
}).then(value => {
    return new Promise((resolve, reject) => {
        reject(new Error(`something went wrong unless ${value}`));
    })
}).then(
    value => console.log(value),
    err => console.log('rejected:', err)
)

// rejected: Error: something went wrong unless done
```

### 👉 Promise.prototype.catch()
`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。


```javascript
// 上面的代码可以处理成这样
const promise = new Promise((resolve, reject) => {
    resolve('done');
}).then(value => {
    return new Promise((resolve, reject) => {
        reject(new Error(`something went wrong unless ${value}`));
    })
}).then(value => console.log(value)
).catch(err => console.log(err))

// Error: something went wrong unless done

// 如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。


p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

看这样一个例子：
```javascript
const promise = new Promise((resolve, reject) => {
  throw new Error('test');
});
promise.catch(error => {
  console.log(error);
});
// Error: test

// 上面代码中，promise抛出一个错误，就被catch()方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。

// 写法一
const promise = new Promise((resolve, reject) => {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(error => {
  console.log(error);
});

// 写法二
const promise = new Promise((resolve, reject) => {
  reject(new Error('test'));
});
promise.catch(error => {
  console.log(error);
});
// 比较上面两种写法，可以发现reject()方法的作用，等同于抛出错误。
```

如果 Promise 状态已经变成resolved，再抛出错误是无效的。
```javascript
const promise = new Promise((resolve, reject) => {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(value => { console.log(value) })
  .catch(error => { console.log(error) });
// ok

// 上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
```

一般来说，不要在`then()`方法里面定义 `Reject` 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

```javascript
// bad
promise
  .then(
    data => {
    // success
    },
    err => {
    // error
  });

// good
promise
  .then(
    data => { //cb
    // success
    })
  .catch(
    err => {
    // error
    });

// 上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch()方法，而不使用then()方法的第二个参数。
```

### 👉 Promise.prototype.finally()
`finally()`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```javascript
const promise = new Promise((resolve, reject) => { resolve(1) })

promise
    .then(result => {})
    .catch(error => {})
    .finally(() => {});
```

### 👉 Promise.all()
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

只有p1、p2、p3的状态都变成`fulfilled`，p的状态才会变成`fulfilled`，此时p1、p2、p3的返回值组成一个数组，传递给`p`的回调函数。

只要p1、p2、p3之中有一个被`rejected`，p的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给p的回调函数。

注意，如果作为参数的 `Promise` 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]



const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了

// 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
```

### 👉 Promise.race()
`Promise.race()`方法同样是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。

```javascript
const p = Promise.race([p1, p2, p3]);

// 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
```

下面是一个例子，如果指定时间内没有获得结果，就将 `Promise` 的状态变为`reject`，否则变为`resolve`。

```javascript
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);

p
.then(console.log)
.catch(console.error);

// 上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。
```

### 👉 Promise.allSettled()
`Promise.allSettled()`方法接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。该方法由 ES2020 引入。

```javascript
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();

// 上面代码对服务器发出三个请求，等到三个请求都结束，不管请求成功还是失败，加载的滚动图标就会消失。
```

使用场景：只关心异步操作有没有结束，不关心异步操作的结果。

### 👉 Promise.any()
ES2021 引入了`Promise.any()`方法。该方法接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例返回。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 `Promise` 变成`rejected`状态而结束。

```javascript
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}

// 上面代码中，Promise.any()方法的参数数组包含三个 Promise 操作。其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。如果所有三个操作都变成rejected，那么await命令就会抛出错误。
```

### 👉 Promise.resolve()
有时需要将现有对象转为 `Promise` 对象，`Promise.resolve()`方法就起到这个作用。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### 👉 Promise.reject()
`Promise.reject(reason)`方法也会返回一个新的 `Promise` 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了

// 上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。


Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true

// Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
```





### 参考资料
- [微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)
- [JavaScript 中的宏任务（MacroTask）与微任务（MicroTask）](http://minimalistying.com/MacroTaskAndMicroTask.html)
- [JavaScript Promise迷你书](http://liubin.org/promises-book/)
- [ECMAScript 6 入门-Promise对象](https://es6.ruanyifeng.com/#docs/promise)
- [用可视化的方式解释事件循环和Promise](https://ths.js.org/categories/Promise/)
