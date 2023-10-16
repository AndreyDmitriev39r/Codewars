function deleteNth(arr,n){
  const hashMap = new Map();
  return arr.filter(el => {    
    hashMap.has(el)
      ? hashMap.set(el, hashMap.get(el) + 1)
      : hashMap.set(el, 1)    
    return hashMap.get(el) <= n;
  })
}

console.log(deleteNth([1,2,2,2,3,3], 2))//[1, 2, 2, 3, 3]