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
console.log(hIndex2([1, 1, 1,3, 3, 2]))