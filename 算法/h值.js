function getH(nums) {
  let len = nums.length
  let h = 0;
  nums.sort((a, b) => a - b)
  let i = len - 1;
  while (i >= 0) {//[1,2,3,4]
    if (nums[i] > h) {
      h++;
    } else {
      return h;
    }
    i--;

  }
  return h
}

console.log(getH([1, 1, 1, 2, 2]))


var hIndex = function (citations) {
  let n = citations.length, tot = 0;
  const counter = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    if (citations[i] >= n) {
      counter[n]++;
    } else {
      counter[citations[i]]++;
    }
  }
  for (let i = n; i >= 0; i--) {
    tot += counter[i];
    if (tot >= i) {
      return i;
    }
  }
  return 0;
};



var hIndex2 = function (citations) {
  citations.sort((a, b) => a - b);
  let h = 0, i = citations.length - 1;
  while (i >= 0 && citations[i] > h) {
    h++;
    i--;
  }
  return h;
};
console.log(hIndex2([1, 1, 1, 3, 3, 2]))

function do_arr(arr1, arr2) {
  let temp_json = {}, res = new Set()
  for (let a of arr1) {
    temp_json[a] = true
  }
  for (let item of arr2) {
    if (temp_json[item]) {
      res.add(item)
    }
  }
  return [...res]
}
console.log(do_arr([1, 2], [2, 3]).toString())




function repeater(func, times, delays) {
  let current = 1, inter = null
  return (str) => {
    func(str)
    inter = setInterval(() => {
      if (current < times) {
        current++
        func(str)
        if (current >= times) {
          current = 1
          clearInterval(inter)
        }
      } else {
        current = 1
        clearInterval(inter)
      }
    }, delays)

  }
}
let repeater_fun = repeater(console.log, 4, 3000)
repeater_fun('hello')


//reduce 用法
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];
var groupBy = function (objArr, property) {
  return objArr.reduce((res, current) => {
    let key = current[property]
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(current)
    return res;
  }, {})
}
var res = groupBy(people, 'age')
console.log(res.valueOf())

//reduce 实现map

Array.prototype.map=function(fn,context){
  let arr=Array.prototype.slice.call(this)
  return arr.reduce((pre,current,index)=>{
    console.log(this)
    return [...pre,fn.call(context,current,index,this)]
  },[])
}
console.log([1,2,3].map((item)=>item+1))


//移除字符串的第n个/
function removeStr(str) {
  var obj = []
  for (var i = 0; i < str.length; i++) {
    if (str[i] == '/') {
      obj.push(i)
    }
  }
  return (num) => {
    if(num>obj.length||num<1){
      return str;
    }
     return str.substring(0, obj[num - 1]) + str.substring(obj[num - 1] + 1, str.length) 
    }
}
var remove = removeStr('aa/aaa/s')
var res = remove(1)
console.log(res)

//中间件
const app={
  fns:[],
  callback(ctx){
    console.log('i am end '+ctx)
  },
  use(fn){
    this.fns.push(fn)
  },
  go(ctx){
    let index=0;
    const next=()=>{
      index++
    }
    this.fns.map((fn,i)=>{
      index===i&&fn(ctx,next)
    })
    index===this.fns.length&&this.callback(ctx)
  }
}
app.use((ctx,next)=>{
  console.log('i am a '+ctx)
  next()
})
app.use((ctx,next)=>{
  console.log('i am b '+ctx)
  next()
})
app.go()
//中间件b middleware
function add5(x) {
  return x + 5;
}

function div2(x) {
  return x / 2;
}

function sub3(x) {
  return x - 3;
}

const chain = [add5, div2, sub3].reduce((a, b) => (...args) => a(b(...args)));
console.log(chain(1))

//洋葱模式,redux compose
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}