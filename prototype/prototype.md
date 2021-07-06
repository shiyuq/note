## 👉 原型

### 👉 基于原型的语言
JavaScript 常被描述为一种基于原型的语言——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。


我们常在js中见到如何新建一个空数组，空对象，空字符串等等，例如新建一个空数组，我们一般使用 `const arr = []` 来创建，然后使用 `console.dir(arr)` 在控制台中查看打印结果，发现有一个 `__proto__` 属性，然后可以再打印一下 `console.dir(Array)` 构造函数，发现其中有一个 `prototype` 属性，打印发现 `arr.__proto__ === Array.prototype`

```javascript
const arr = []
const newArr = new Array()
console.dir(arr)
console.dir(newArr)
/**
 * length: 0
 * __proto__: {
 * concat: function () {}
 * ...
 * }
 */

console.dir(Array)
/**
 * from: function() {}
 * isArray: function() {}
 * prototype: {
 * concat: function () {}
 * }
 * __proto__: {
 * apply: function() {}
 * bind: function() {}
 * call: function() {}
 * }
```

在清晰概念之前我们得搞清楚，什么是构造函数，什么是实例对象，比如上例，`newArr`这个变量是什么？`Array`又是什么，按照JavaScript语言的定义来说，首字母大写的函数一般都叫做构造函数(是函数只不过是特殊的函数而已)，`newArr`就是用构造函数`new`关键字实例化出来的一个对象。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接，`它是__proto__属性，是从构造函数的prototype属性派生的`，之后通过上溯原型链，在构造器中找到这些属性和方法。

---

### 👉 使用JavaScript中的原型
上面介绍了其实每一个函数都会有`prototype`属性，您可以在 chrome 控制台中运行下面代码来帮助理解。

```JavaScript
// 函数命名方式一
function doSomething(){}
console.log( doSomething.prototype );
// 函数命名方式二
var doSomething = function(){};
console.log( doSomething.prototype );

// 往 doSomething 原型上添加一些属性
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );

// 在 doSomething 原型的基础上，创建一个 doSomething 的实例
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // 添加属性
console.log(doSomeInstancing);
// 这里发现 doSomeInstancing.__proto__ === doSomething.prototype
```

设计的精妙之处在哪里？

首先，属性的查找顺序是怎样的？如果要在`doSomeInstancing`这个对象上寻找`prop`的值，我们可以直接发现就是`some value`，如果寻找`foo`的值，发现返回的值是`bar`。这其实很好理解。

当你访问 `doSomeInstancing` 的一个属性，首先会去查找 `doSomeInstancing` 是否有这个属性，如果没有怎么办呢？然后会去查找 `doSomeInstancing` 这个实例的原型对象上是否有这个属性，也就是会去查找 `doSomeInstancing.__proto__`，这个不就是构造函数的 `prototype` 属性吗？所以，找到了 `doSomething.prototype`，如果 `doSomething.prototype` 上面有这个属性，就直接返回，如果没有找到，就会接着去找 `doSomeInstancing.__proto__.__proto__`，发现 `doSomeInstancing.__proto__.__proto__ === Object.prototype`，然而如果在 `Object.prototype` 上也没有发现属性的话，就会去寻找 `doSomeInstancing.__proto__.__proto__.__proto__`，发现返回的结果是 `null`，最后找完了没有这个属性，得出属性值为 `undefined`

```JavaScript
function doSomething(){}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);

/**
doSomeInstancing.prop:      some value
doSomeInstancing.foo:       bar
doSomething.prop:           undefined
doSomething.foo:            undefined
doSomething.prototype.prop: undefined
doSomething.prototype.foo:  bar
 */
```

---

### 👉 理解原型对象
首先定义一个构造器函数
```JavaScript
function Person(first, last, age, gender, interests) {
  // 属性与方法定义
};
```

然后创建一个实例对象
```JavaScript
var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
```

原型链的运作机制
```
        inherits from prototype                inherits from prototype
person1                             Person                               Object
                  =>                                    =>
```

注意：必须重申，原型链中的方法和属性没有被复制到其他对象——它们被访问需要通过前面所说的“原型链”的方式。

---

### 👉 prototype 属性：继承成员被定义的地方
继承的属性和方法是定义在 prototype 属性之上的，你可以称之为子命名空间 (sub namespace) ——那些以 `Object.prototype.` 开头的属性，而非仅仅以 `Object.` 开头的属性。`prototype` 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中。

JavaScript 中到处都是通过原型链继承的例子。比如，你可以尝试从 `String`、`Date`、`Number` 和 `Array` 全局对象的原型中寻找方法和属性。

---

### 👉 constructor属性
每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于构造此实例对象的构造函数。

```JavaScript
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true
```
