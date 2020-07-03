// JavaScript深入之从原型到原型链

function Person(){

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name='mkk'
var person =new Person();
console.log(person.name);