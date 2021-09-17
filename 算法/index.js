/**
 * js各类手写实现
 */

const log = console.log

//手写bind

//bind实现要复杂一点  因为他考虑的情况比较多 还要涉及到参数合并(类似函数柯里化)
Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  let _this = this;
  //  bind情况要复杂一点
  const result = function (...innerArgs) {
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
      delete this[fn];
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
      delete context[fn];
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};

//用法如下

function Person(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function () {
  console.log(123);
}
let obj = {
  objName: '我是obj传进来的name',
  objAge: '我是obj传进来的age'
}
// 普通函数
function normalFun(name, age) {
  console.log(name);   //'我是参数传进来的name'
  console.log(age);   //'我是参数传进来的age'
  console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); //'我是obj传进来的name'
  console.log(this.objAge); //'我是obj传进来的age'
}

//先测试作为构造函数调用
let bindFun = Person.myBind(obj, '我是参数传进来的name')
let a = new bindFun('我是参数传进来的age')
a.say() //123

//再测试作为普通函数调用
let bindFun2 = normalFun.myBind(obj, '我是参数传进来的name')
bindFun2('我是参数传进来的age')


//发布订阅模式
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack];
    } else {
      this.events[type].push(callBack);
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack;
    });
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] &&
      this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}
// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest.toString());
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

// event.emit("click", 1, 2);

// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");

class Fabu {
  constructor() {
    this.subList = {}
  }
  sub(type, callback) {
    if (!this.subList[type]) {
      this.subList[type] = [callback]
    } else {
      this.subList[type].push(callback)
    }
  }
  unsub(type, callback) {
    this.subList[type] = this.subList[type].filter((item) => {
      return item != callback
    })
  }
  on(type, ...params) {
    this.subList[type] && this.subList[type].map((func) => {
      func.apply(this, params)
    })
  }
}
let testsub = new Fabu()
testsub.sub('cal', (a) => {
  console.log(a.toString())
})
testsub.on('cal', 123, 23)
testsub.unsub('cal')


//虚拟dom 转真实dom

// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作 这一步是关键
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}



//flatten  
function isObject(val) {
  return typeof val === "object" && val !== null;
}

function flatten(obj) {
  if (!isObject(obj)) {
    return;
  }
  let res = {};
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");

  return res;
}
flatten();

//判断括号是否有效
function isValid(str) {
  const kuohao = {
    '{': '}',
    '[': ']',
    '(': ')'
  }
  if (str.length % 2 !== 0) return false
  var tmp = []
  for (var item in str) {
    if (item == '{' || item == '[' || item == '(') {
      tmp.push(item)
    } else {
      if (kuohao[item] != tmp.pop()) {
        return false
      }
    }
  }
  return true
}
log(isValid('{{}}{()}'))

//数组元素的最长公共字符串
function maxStr(arr) {
  if (arr.length == 0) return arr
  let max = arr.shift().split('')
  for (let index in max) {
    for (let item of arr) {
      if (item[index] != max[index]) {
        return max.slice(0, index).join('')
      }
    }
  }
  return max.join('')
}
log(maxStr(["oflower"]))

//字符串最长的不重复子串

const lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let left = 0;
  let right = 1;
  let max = 0;
  while (right <= s.length) {
    let lr = s.slice(left, right);
    const index = lr.indexOf(s[right]);

    if (index > -1) {
      left = index + left + 1;
    } else {
      lr = s.slice(left, right + 1);
      max = Math.max(max, lr.length);
    }
    right++;
  }
  return max;
};
log(lengthOfLongestSubstring('abbcdea'))

var lengthOfLongestSubstring1 = function (s) {
  let l = 0;
  let res = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r]) >= l) { // 注意 abbcdea 这种情况
      l = map.get(s[r]) + 1;
    }
    res = Math.max(res, r - l + 1);  //更新最长子串
    map.set(s[r], r);
  }
  return res;
};
log(lengthOfLongestSubstring1('abbcdea'))

function dealStr(str) {
  return str.split('').map(item => {
    return item.toUpperCase() == item ? item.toLowerCase() : item.toUpperCase()
  }).join('')
}
log(dealStr('aBCdMn'))



// promise 顺序执行
async function step_promise(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let data = await arr[i]()
    res.push(data)
  }
  return await res
}
function getA() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(2);
      console.log(2)
    }, 1000);
  });
}

function getB() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(3);
      console.log(3)
    }, 1000);
  });
}

function addAB(arr) {
  return arr.reduce((count, item) => count + item, 0)
}

step_promise([getA, getB, getA]).then(res => {
  return addAB(res)
}).then(res => { console.log(res) })


/**
 *  深拷贝  递归实现 
 */
//存放已拷贝的对象用于循环引用检测
let objArr = [];

function deepCopy(obj) {
  //判断循环引用检测
  for (let ele of objArr) {
    if (obj === ele.source) {
      return ele.target;
    }
  }
  //拷贝容器
  let newObj = {};

  //将拷贝的对象放入数组中用于循环引用检测
  objArr.push({
    source: obj, //被拷贝对象上的原引用对象，用于循环检测比对
    target: newObj
  })

  //使用Reflect可以检测到Symbol类型的属性
  Reflect.ownKeys(obj).forEach(key => {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        //使用Array.from对拷贝的数组进行处理
        newObj[key] = Object.prototype.toString.call(obj[key]) === '[object Array]' ? Array.from(deepCopy(obj[key], key)) : deepCopy(obj[key], key);
      } else {
        //属性值为原始类型的值
        newObj[key] = obj[key];
      }
    }
  })
  return newObj;
}
let mm = deepCopy({ a: [1, 2, 3], b: 1 })
log(mm)

/**
 *  深拷贝  迭代的方式 解决了递归方法的爆栈问题
 */
function cloneForce(x) {
  //拷贝对象记录
  const uniqueList = [];

  let root = {};

  // 循环数组
  const loopList = [{
    parent: root,
    key: undefined,
    data: x,
  }];

  while (loopList.length) {
    //深拷贝，元素出栈
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    // 判断数据是否存在  循环引用问题
    let uniqueData = find(uniqueList, data);
    //数据存在
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    //数据不存在，将其放入数组
    uniqueList.push({
      source: data,
      target: res,
    });

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}

let mm1 = cloneForce({ a: [1, 2, 3], b: 1 })
log(mm1)