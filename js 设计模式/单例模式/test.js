var Singlton =function(name){
    this.name=name;
    this.instance=null;
}
Singlton.prototype.getName=function(){
  console.log(this.name)
}
Singlton.getInstance=function(name){
  if(this.instance){
    return this.instance;
  }else{
    return this.instance=new Singlton(name)
  }

}
let winner=Singlton.getInstance('winner')
let looser=Singlton.getInstance('looser')
console.log(winner===looser)
winner.getName()
looser.getName()

let CreateSingleton = (function(){
    let instance;
    return function(name) {
      console.log(this)
        if (instance) {
            return instance;
        }
        this.name = name;
        return instance = this;
    }
})();
new CreateSingleton(1)
function test(){
  console.log(this)
}
new test()


var func =(function(){
  let ishave;
  return function(name){
    if(ishave){
    return ishave;
    }else{
      return ishave=new singlenton(name)
    }

  }
})();
let singlenton=function(name){
  this.name=name
}
singlenton.prototype.getName=function(){
  console.log(this.name)
}
let a=new func(1)
let b=new func(2)
a.getName()
b.getName()