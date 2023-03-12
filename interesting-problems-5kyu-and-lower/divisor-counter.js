function getDivisorsCnt(n){
  let result = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result += 2;
    }
  }
  return n % Math.sqrt(n) === 0 ? result - 1 : result;
}