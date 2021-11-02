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
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
    return Student;
}());
function hello(person) {
    return "hello, " + person.firstName + " " + person.lastName;
}
var user = new Student('shi', 'yuq');
hello(user);
