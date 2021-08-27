## JavaScript 中的 this

###  JavaScript 内存中的数据结构

JavaScript 中之所以有 `this` 的设计，跟内存中的数据结构有密切的关系

```javascript
const obj = {foo: 5};
```

上面将一个对象赋值给变量  `obj`，Javascript 首先会开辟一个内存空间，存放对象 `{foo: 5}`， 然后将该内存地址的地址赋值给变量 `obj`

所以，变量 `obj` 是一个地址，如果想要获取 `obj.foo`，首先会从 `obj` 中拿到内存地址，然后从该地址中去除它的 `foo` 属性

 而我们知道，每一个属性名其实都对应这一个属性描述对象，用上面的 `foo` 属性来说，实际在里面会是这样的结构

```javascript
{
	foo: {
		[[value]]: 5,
         [[writable]]: true,
         [[enumerable]]: true,
         [[configurable]]: true
	}
}
```

这里 `foo` 属性的值被保存在了属性描述对象的 `value` 属性中

了解上面的基础后，然后我们来看下面这样一个例子

```javascript
const obj = {
	foo: function () {}
}
```

也就是当我们的属性的值是一个函数的时候，JavaScript会将函数单独保存在内存中，然后再将函数的地址赋值给 `foo` 属性，也就是下面这样

```JavaScript
{
	foo: {
		[[value]]: "函数的地址",
         [[writable]]: true,
         [[enumerable]]: true,
         [[configurable]]: true
	}
}
```

因为函数又是一个单独的值，可以在不同的环境下执行，可以理解为上下文

```JavaScript
const f = function () {};
const obj = {f: f};
// 单独执行，即在 window 中执行
f();
// 在 obj 环境中执行
obj.f();
```

然后我们有知道，JavaScript 是允许在函数体内部，引用当前环境的其他变量的（可以去看下闭包）

```JavaScript
const f = function () {
	console.log(x)
}
```

上面函数体中使用了变量 `x`，而这个 `x`，是可以定义在函数体外的，是由当前运行环境提供的，大概就是这个意思

现在问题就来了，因为函数可以在不同的运行环境下执行，所以需要提供一种机制，能够在函数体内部获得当前运行环境，也就是上下文，所以，`this` 就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境

```JavaScript
const f = function () {
	console.log(this.x)
}
```

上面 `this.x` 就指代当前运行环境的 `x`

```JavaScript
const f = function () {
	console.log(this.x)
}

const x = 1;
const obj = {
    f: f,
    x: 2
}

// 单独执行，运行环境是当前的window
f(); // 1
// 当你调用一个方法但是却不指定它的对象时，JavaScript在非严格模式下会将 this 设置为全局对象，严格模式下就是 undefined

// obj 环境执行
obj.f() // 2
```

### 全局上下文

全局上下文中，`this`引用的是全局对象，它是 web 浏览器上的 `window` 对象或者是 `nodejs` 上的 `global` 对象

```JavaScript
console.log(this === window); // true
```

其实全局上下文也是一个对象，那么我们在全局上下文中定义添加属性时，也是直接加入到全局对象中的

```JavaScript
this.name = 'shiyuq';
console.log(window.name); // shiyuq
```

### 函数上下文

#### 简单的函数调用

```javascript
function show() {
	console.log(this === window); // true
}
show();
```

当调用 `show()` 函数时，`this`引用了全局对象，和 `window.show()` 有着一样的效果

#### 方法调用

当调用对象的方法时，`JavaScript` 会将 `this` 指向调用该方法的对象。 请看下面一个例子：

```JavaScript
const car = {
	brand: 'bmw',
	getBrand: function() {
		return this.brand;
	}
}

car.getBrand(); // bmw
```

由于方法是作为对象属性的值存储的，因此您可以将其存储在变量中

```JavaScript
const brand = car.getBrand;

// 然后可以通过变量来调用函数
brand(); // undefined
```

这里由于你调用了一个方法，但是没有指定它的对象，所以 `this` 指向的全局对象，而 `window` 上是没有 `brand` 属性的，导致返回 `undefined`

那么，如果我们想要通过这种方式来调用，可以这样解决

```JavaScript
const brand = car.getBrand.bind(car);
brand(); // bmw
```

在上面的例子中，当你调用 `brand()` 方法时，`this`关键字被绑定到 `car` 对象。

#### 构造函数调用

当使用 `new` 关键字创建函数对象的实例时，这个函数是用作构造函数；下面声明了一个 `Car` 函数，然后将其作为构造函数调用

```JavaScript
function Car (brand) {
	this.brand = brand;
}

Car.prototype.getBrand = function () {
	return this.brand;
}

const car = new Car('bmw');
car.getBrand(); // bmw
```

构造函数中调用的话，我们需要去具体了解 `new` 这个关键词具体创建实例的过程，也有很多文章提到过如何避免程序员经常性的忘记写 `new` 关键字的问题

```JavaScript
function Car(brand) {
	if (!(this instance of Car)) {
		throw Error('you must use new key operator to call the function!')
	}
    // es6 的方法来判断
	if (!new.target) {
		throw Error('you must use new key operator to call the function!')
	}
	this.brand = brand;
}
```

#### 间接函数调用

主要涉及到的就是 `call` 和 `apply`两个方法，这两个方法允许你在调用函数的时候指定 `this` 值

```JavaScript
function getBrand(prefix) {
	return `${prefix}${this.brand}`
}

const audi = {
	brand: 'audi'
}

const bmw = {
	brand: 'bmw'
}

getBrand.call(audi, "a beautiful car "); // "a beautiful car audi"
getBrand.call(bmw, "a nice car "); // "a nice car bmw"
getBrand.apply(audi, ["a beautiful car "]); // "a beautiful car audi"
getBrand.apply(bmw, ["a nice car "]); // "a nice car bmw"
```

在上面的例子中，我们使用的 `call()`方法间接调用了 `getBrand()` 函数，而且我们直接指定了 `this` 的指向，是 `call` 和 `apply` 的第一个参数，所以我们能够使用这种方式实现，而且`call` 和 `aplly` 的区别就是一个传参是数组的区别

#### 箭头函数

箭头函数不会创建自己的上下文，而是从定义箭头函数的外部函数继承 `this`

```JavaScript
const getThis = () => this;
getThis() === window; // true
```

所以在某些情况下，使用箭头函数定义方法会出现问题

```javascript
function Car (brand) {
	this.brand = brand;
}

Car.prototype.getBrand = () => {
	return this.brand;
}

const car = new Car('bmw');
car.getBrand(); // undefined
```

这里调用的时候，`this` 指向的是全局对象，而不是 `Car` 对象，返回`undefined`

### 特殊环境——闭包

直接来看一个例子

```JavaScript
const o = {
  name: "shiyuq",
  age: 18,
  gender: "M",
  speak: function () {
    function fun(){
      console.log(this);
    }
    fun();
  }
};
o.speak();  //Window
```

既然我们说`this`指向的是调用它的函数，但是我们想想：这个 func 函数是对象的方法吗？不是！它仅仅是在另一个函数中的一个函数，所以，凡是没有定义在对象或 `prototype` 原型上的函数，其中的 `this` 都指向 `window` 

但是我们也可以在它内部实现

```javascript
const o = {
  name: "shiyuq",
  age: 18,
  gender: "M",
  speak: function () {
    const _this = this;
    function fun(){
      console.log(_this);
    }
    fun();
  }
};
o.speak();  // {name: 'shiyuq', age: 18, gender: 'M', speak(){}}
```

这样我们可以将当前运行环境 `o` 传给下一层的函数调用

### 参考文章

- [JavaScript中的this原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
- [JavaScript——this（MDN）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

