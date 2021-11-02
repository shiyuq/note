## 快速学习TypeScript

### 安装TypeScript

vscode重度使用者，推荐使用npm全局进行安装

```bash
npm install -g typescript
```

### 构建你的第一个TypeScript文件

新建一个hello.ts文件，在文件中我们写入一些代码

```javascript
function greet(person) {
  return `hello, ${person}`;
}

const user = 'shiyuq';

greet(user);
```

### 编译代码

我们使用了`.ts`的扩展名来标识此文件为ts文件，但是我们可见的是代码中仅仅是一堆js代码而已。甚至你可以复制这段代码在浏览器中运行

在命令行中，我们运行TypeScript编译器：

```bash
tsc hello.ts
```

结果输出了一个`hello.js`文件，发现它其实和我们上述的代码并无二置。那么一切准备完成后，我们来研究一下TypeScript工具带来的高级功能~

### 类型注解

你可以这样理解，就是一种为函数或者变量添加约束的方式，比如上面的`greet`方法中，我想为`person`参数加上字符串的限制

```JavaScript
function greet(person: string) {
  return `hello, ${person}`;
}
```

然后我们尝试调用`greet`函数，并将`person`参数的类型修改一下

```JavaScript
const person = [1, 2, 3];
greet(person);
```

重新编译后，你会发现以下错误

```bash
hello.ts(14,7): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

告诉我们在`hello.ts`文件的第14行第7个字符处，有一个错误类型为2345的错误，但是`hello.js`文件仍然会继续创建，但是TypeScript会警告你代码可能不会按照预期执行

### 接口

让我们开发下面这个应用示例，这里我们使用接口来描述一个拥有`firstName`和`lastName`字段的对象

```javascript
interface Person {
    firstName: string;
    lastName: string;
}

function hello(person: Person) {
    return `hello, ${person.firstName} ${person.lastName}`;
}

const user = {firstName: 'shi', lastName: 'yuq'};

hello(user);
```

### 类

然后我们用类来改写上面的例子，注意：在构造函数的参数上使用`public`等同于创建了同名的成员变量

```javascript
class Student {
  fullName: string;
  constructor(public firstName, public lastName) {
    this.fullName = firstName + lastName
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function hello(person: Person) {
  return `hello, ${person.firstName} ${person.lastName}`;
}

const user = new Student('shi', 'yuq');
hello(user);
```

重新运行`tsc hello.ts`，我们看到ts里面的类其实就是Javascript中常用的基于构造函数实现的类

然后我们可以对新生成的`hello.js`，执行`node hello.js`，其结果是一样的

### 基础语法

tsc常用编译参数如下

| 序号 |                         编译参数说明                         |
| :--: | :----------------------------------------------------------: |
|  1   |                   --help<br />显示帮助信息                   |
|  2   |                  --module<br />载入扩展模块                  |
|  3   |                  --target<br />设置ECMA版本                  |
|  4   |       --declaration<br />额外生成一个.d.ts扩展名的文件       |
|  5   |             --removeComments<br />删除文件的注释             |
|  6   |        --out<br />编译多个文件并合并到一个输出的文件         |
|  7   | --sourceMap<br />生成一个sourceMap(.map)文件=>源代码和编译代码位置的映射信息 |
|  8   | --module nolmplicitAny<br />在表达式和声明上有隐含的any类型时报错 |
|  9   | --watch<br />在监视模式下运行编译器，会监视输出文件，在它们改变时重新编译 |

### 保留关键字

|  保留字  |   保留字   |   保留字   |  保留字  |
| :------: | :--------: | :--------: | :------: |
|  break   |     as     |   catch    |  switch  |
|   case   |     if     |   throw    |   else   |
|   var    |   number   |   string   |   get    |
|  module  |    type    | instanceof |  typeof  |
|  public  |  private   |    enum    |  export  |
| finally  |    for     |   while    |   void   |
|   null   |   super    |    this    |   new    |
|    in    |   return   |    true    |  false   |
|   any    |  extends   |   static   |   let    |
| package  | implements | interface  | function |
|   new    |    try     |   yield    |  const   |
| continue |     do     |            |          |

### 格式要求

1. TypeScript区分大小写，所以定义变量需要注意
2. 分号是可选的（但是建议统一风格，使用分号）
3. TypeScript注释（和JavaScript一样）
   * 单行注释（//）
   * 多行注释（/* */）

### 在线尝试TypeScript

[在线尝试TypeScript的一些功能](https://www.typescriptlang.org/play)

### TypeScript和JavaScript的区别

我们知道TypeScript是JavaScript的超集，也就意味着我们可以在TypeScript环境中运行JavaScript代码，并且TypeScript还扩展了JavaScript的语法，主要方便我们对于大型应用的开发，便于统一风格，规范开发代码

TypeScript的优势：

* 方便开发人员做注释
* 能过够帮助开发人员检测出错误并及时修改
* TypeScript工具使得重构变得更加容易便捷
* TypeScript引入了JavaScript中缺乏的类的概念
* 引入了模块的概念，可以把申请、数据、函数、类封装在模块中

TypeSCript的劣势：

* 如果不对ts项目进行严格的代码规范，那么使用ts不能提高项目的安全性和严谨性，而且会给自己带来很多麻烦
* 切忌最后变成`anyscipt`

