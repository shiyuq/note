// function greet(person) {
//   return `hello, ${person}`;
// }

// const user = 'shiyuq';

// greet(user);

// function greet(person: string) {
//   return `hello, ${person}`;
// }

// const person = [1, 2, 3];
// greet(person);


// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function hello(person: Person) {
//   return `hello, ${person.firstName} ${person.lastName}`;
// }

// const user = {firstName: 'shi', lastName: 'yuq'};

// hello(user);

// class Student {
//   fullName: string;
//   constructor(public firstName, public lastName) {
//     this.fullName = firstName + lastName
//   }
// }

// interface Person {
//   firstName: string;
//   lastName: string;
// }

// function hello(person: Person) {
//   return `hello, ${person.firstName} ${person.lastName}`;
// }

// const user = new Student('shi', 'yuq');
// hello(user);

// let foo: string

// let bar: 5 = 5
// let y: number = 4 + 1

// let username: string | null

// username = 'shiyuq'
// username = null

// let username1: string & number

// type命令用来定义一个类型的别名
// type A = { foo: number }
// type B = A & { bar: string }
// let age: A = { foo: 1 }
// let obj: B = { foo: 1, bar: '1' }

// const arr: readonly number[] = [1, 2, 3]
// const a1: ReadonlyArray<number> = [1, 2, 3]
// const a2: Readonly<number[]> = [1, 2, 3]

// const myUser:{ name: string } = {
//   name: "Sabrina"
// } as const

// myUser.name = 'shiyuq'

// type MyObj = {
//   [property: string]: string
// };

// const obj1:MyObj = {
//   foo: 'a',
//   bar: 'b',
//   baz: 'c',
// };

// type T1 = {
//   [property: number]: string
// };

// type T2 = {
//   [property: symbol]: string
// };

// type MyArr = {
//   [n:number]: number;
// };

// const arr1:MyArr = [1, 2, 3];
// const arr2:MyArr = {
//   0: 1,
//   1: 2,
//   2: 3,
// };

// interface A {
//   f(x: boolean): string
// }

// interface B {
//   f: (x: boolean) => string;
// }

// interface Shape {
//   name: string;
// }

// interface Circle extends Shape {
//   radius: number;
// }

// // 如果type命令定义的类型不是对象，interface 就无法继承
// type Country = {
//   name: string;
//   capital: string;
// }

// interface CountryWithPop extends Country {
//   population: number;
// }

// class A {
//   x:string = '';

//   y():boolean {
//     return true;
//   }
// }

// interface B extends A {
//   z: number;
// }

// type能够表示非对象类型，而interface只能表示对象类型
// interface 可以继承其他类型，type不支持继承
// 同名interface会合并，而type会报错
// this关键字只能用于interface

class Point {
  x: number
  y: number
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

class A {
  readonly id: string
  readonly number: string = '321'

  constructor() {
    this.id = '123'
    this.number = '123'
  }
}

class C {
  _name = ''
  get name() {
    return this._name
  }

  set name (value) {
    this._name = value
  }
}
