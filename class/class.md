# 类

## 类的出现

由于前面花费了不少时间向大家介绍如何使用`ES5`的特性来模拟类似于类的行为，而实现继承的代码如此的冗长和混乱导致 `ES6` 新引入的 `class` 关键字具有正式定义类的能力。虽然表面看起来支持正式的面向对象编程，但是背后使用的仍然是原型和构造函数的概念。我们通常亲切的叫她 **语法糖**。

如果没有阅读相关的文章，推荐阅读 [JavaScript 中的继承](https://juejin.cn/post/6995777334951280653)

## 类定义

两种方式定义类：类声明和类表达式

```JavaScript
// 类声明
class Person { }

// 类表达式
const Animal = class {};
```

其实与函数表达式很类似，在它们被求值前都不能引用，唯一不同的是：

- 函数声明可以提升，但类定义不行
- 函数会受函数作用域限制，但类受块作用域限制

```JavaScript
console.log(FunctionExpression); // undefined
var FunctionExpression = function() {};
console.log(FunctionExpression); // function() {}
// 注意这里如果将 var 换成 let 或 const，将会报错，具体缘由请查看 JS 变量提升

console.log(FunctionDeclaration); // FunctionDeclaration() {}
function FunctionDeclaration() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}

console.log(ClassExpression); // undefined
var ClassExpression = class {};
console.log(ClassExpression); // class {}

console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // class ClassDeclaration {}
```

## 类的构成

类可以包含构造函数

