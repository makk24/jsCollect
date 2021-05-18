function handleArray(a,b){
  let res={}
  if(a instanceof Array && b instanceof Array){
    let c =a.concat(b)
    console.log(c)
    c.forEach(item=>{
      res[item]=(res[item]||0)+1
    })
    for(key in res){
      if(res[key]<2){
        delete res[key]
      }
    }
  }
  console.log(res)
  return res
}
handleArray([1,23,4,5,6,12,3,4],[1,2,323,4,5,23])