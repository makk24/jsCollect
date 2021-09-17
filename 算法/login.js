
function deal_concurrent(){
  let is_running=false;
  let listeners=[];
  return function(func){
    listeners.push(func)
    if(is_running){
      return;
    }else{
      is_running=true
      wxlogin().then(res=>{
        listeners.map(func=>{
          func(res)
        })
        listeners=[]
        is_running=false
      })
    }
  }
} 

function wxlogin(){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('login success')
      resolve()
    },1000)
  })
}

//test
const test_login=deal_concurrent()
test_login((res)=>{
  console.log('i am a'+res)
})
test_login((res)=>{
  console.log('i am b'+res)
})
test_login((res)=>{
  console.log('i am c'+res)
})


