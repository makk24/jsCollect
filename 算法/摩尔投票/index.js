/**
 * 
 * @param {*} nums 
 * @returns 
 * 
 * 关于摩尔投票（获取超过半数的投票值）
 * 
 * 采用两次循环，首先是进行一次循环，遍历每个元素，有一致的+1，不一致的-1，count=0后换下一个数，最终如果count>0，在进行一次循环，计算重复的次数，判断是否超过半数，其他情况均返回-1
 * 
 * 
 */
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