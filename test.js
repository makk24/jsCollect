function object(o) {
  function F() { }
  F.prototype = o
  return new F()
}


function person() {
  this.name = 'aa'
  this.friends = [1, 2, 3]
}
// {
//   name: "Nicholas",
//   friends: ["Shelby", "Court", "Van"]
//   };

// var anotherPerson = object(person.prototype);
// anotherPerson.name = "Greg";
// anotherPerson.friends.push("Rob");
// var yetAnotherPerson = object(person);
// yetAnotherPerson.name = "Linda";
// yetAnotherPerson.friends.push("Barbie");
// console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"
// console.log(anotherPerson.friends); //"Shelby,Court,Van,Rob,Barbie"
// console.log(yetAnotherPerson.friends); //"Shelby,Court,Van,Rob,Barbie"


function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype); //创建对象
  prototype.constructor = subType; //增强对象
  subType.prototype = prototype; //指定对象
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype =new SuperType()
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27


inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27




