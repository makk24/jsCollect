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




//最大回文
/**
 * 
 * f(x,y)=
 * 
 *中心扩散法怎么去找回文串？
从每一个位置出发，向两边扩散即可。遇到不是回文的时候结束。举个例子，str = acdbbdaastr=acdbbdaa 我们需要寻找从第一个 b（位置为 33）出发最长回文串为多少。怎么寻找？
首先往左寻找与当期位置相同的字符，直到遇到不相等为止。
然后往右寻找与当期位置相同的字符，直到遇到不相等为止。
最后左右双向扩散，直到左和右不相等。如下图所示：

作者：reedfan
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-fa-he-dong-tai-gui-hua-by-reedfa/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
  if (s.length<2){
      return s
  }
  let res = ''
  for (let i = 0; i < s.length; i++) {
      // 回文子串长度是奇数
      helper(i, i)
      // 回文子串长度是偶数
      helper(i, i + 1) 
  }

  function helper(m, n) {
      while (m >= 0 && n < s.length && s[m] == s[n]) {
          m--
          n++
      }
      // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
      // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
      if (n - m - 1 > res.length) {
          // slice也要取[m+1,n-1]这个区间 
          res = s.slice(m + 1, n)
      }
  }
  return res
};


function search(str){
  let left=0,right=0,max_len=0,str_len=str.length
  for (let index = 0; index < str_len; index++) {
    let l=index-1
    let r=index+1
    if(l>=0&&r<str_len){
      abc(l,r)
    }else{

    }
    
  }

  function abc(l,r){
    let len=0
    if(str[l]==str[r]){
      len=r-l+1
      max_len=max_len>len?max_len:len

    }else{

    }
  }
}

