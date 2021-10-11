
const log = console.log

function bindThis(f, oTarget) {
  return function () {
    return f.call(oTarget, ...arguments)
  }
}
function bindThis(f, oTarget) {
  return function (...arg) {
    let sym = Symbol('func')
    oTarget[sym] = f
    return oTarget[sym](...arg)
  }
}
function bindThis(f, oTarget) {
  let args = Array.prototype.slice.call(arguments, 2);
  return function () {
    return f.apply(oTarget, Array.prototype.slice.call(arguments).concat(args));
  }
}
//test bindThis
(function () { var r = bindThis(function (a, b) { return this.test + a + b }, { test: 2 })(2, 3); return r === 7; })()


function getUrlParam(sUrl, sKey) {
  let temp_list = sUrl.split('?')
  if (temp_list[1]) {
    temp_list[1].includes('#') && (temp_list[1] = temp_list[1].split('#')[0])
  }
  let params = temp_list[1], list = null, param_json = {}
  if (params) {
    list = params.split('&')
    list.map(item => {
      let param_l = item.split('=')
      let key = param_l[0]
      if (param_json[key]) {
        param_json[key].push(param_l[1])
      } else {
        param_json[key] = [param_l[1]]
      }
    })
  }
  if (sKey) {
    return param_json[sKey] && param_json[sKey].length == 1 ? param_json[sKey][0] : (param_json[sKey] || '')
  } else {
    return param_json
  }
}

function getUrlParam(sUrl, sKey) {
  var paramArr = sUrl.split('?')[1].split('#')[0].split('&'); // 取出每个参数的键值对放入数组
  const obj = {};
  paramArr.forEach(element => {
    const [key, value] = element.split('=');  // 取出数组中每一项的键与值
    if (obj[key] === void 0) {   // 表示第一次遍历这个元素，直接添加到对象上面
      obj[key] = value
    } else {
      obj[key] = [].concat(obj[key], value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
    }
  });
  return sKey === void 0 ? obj : obj[sKey] || ''   // 如果该方法为一个参数，则返回对象。
  //如果为两个参数，sKey存在，则返回值或数组，否则返回空字符。
}

log((function () { var a = getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&key=4&test1=4#hehe'); return a.key.join('') === '1234'; })())


//查找两个节点的最近的一个共同父节点，可以包括节点自身
//输入描述：
//oNode1 和 oNode2 在同一文档中，且不会为相同的节点
function commonParentNode(oNode1, oNode2) {
  let parentNode1 = oNode1.parentNode;
  let parentNode2 = oNode2.parentNode;
  while (true) {
    if (parentNode1.contains(oNode2)) {
      return parentNode1;
    }
    if (parentNode2.contains(oNode1)) {
      return parentNode2;
    }
    parentNode1 = parentNode1.parentNode;
    parentNode2 = parentNode2.parentNode;
  }
}
/**
 * 描述
根据包名，在指定空间中创建对象
输入描述：
namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
输出描述：
{a: {test: 1, b: {c: {d: {}}}}}
 */
function namespace(oNamespace, sPackage) {
  let list = sPackage.split('.'), current = oNamespace, index = 0
  while (index<list.length) {
    let temp=current[list[index]]
    if (Object.prototype.toString.call(temp)==="[object Object]") {
      current = temp
    }else {
      current[list[index]]={}
      current=current[list[index]]
    }
    index++
  }
  return oNamespace
}

function namespace(oNamespace, sPackage) {
  let list = sPackage.split('.'), current = oNamespace, index = 0
  list.forEach(item=>{
    current=current[item]=Object.assign({},current[item])
  })
  return oNamespace
}
log(JSON.stringify(namespace({a: {test: 1, b: 2}}, 'a.b.c.d')))

/**
 * 
 */