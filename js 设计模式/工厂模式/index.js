class Product{
  constructor(name){
    this.name=name
    console.log(name)
  }
  init(){
    console.log('init')
  } 
  fun(){
    console.log('fun')
  }
}
class Apple extends Product{
  constructor(name){
    super(name)
  }
  init(){
    console.log('apple init')
  }
}

const apple =new Apple('apple')
apple.init()
apple.fun()