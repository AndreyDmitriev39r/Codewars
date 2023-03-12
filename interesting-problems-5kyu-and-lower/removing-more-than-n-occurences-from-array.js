function deleteNth(arr,n){
  const hashMap = new Map();
  return arr.filter(el => {
    hashMap.has(el)
      ? hashMap.set(el, hashMap.get(el) + 1)
      : hashMap.set(el, 1)
    return hashMap.get(el) <= n;
  })
}