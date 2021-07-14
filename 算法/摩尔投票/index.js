function getMaxNum(nums){
  let current='',count=0
  for (let item of nums){
    if(count===0){
      current=item
    }
    if(item===current){
      count++
    }else{
      count--
    }
  }
  if(count>0){
    count=0
    for (let item of nums){
      if(item===current){
        count++
      }
    }
    if(count>(nums.length/2)){
      return {current,count}
    }
  }
  return -1
}

console.log(getMaxNum([1,5,3,4,5,5,5,4,5,5]))