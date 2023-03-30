// TASK LINK >>> https://www.codewars.com/kata/59f6e1af3640ce12510000ad

// 272619325597593231536305887388...

const genSequence = (n, isSquare = false) => {
  let result = "";
  let num = 1;
  while(result.length <= n) {
    result += isSquare ? num ** 2 : num;
    num ++;
  }
  return result.substring(0, n + 1);
}

const findDigit = (n) => {  
  const [naturals, squares] = [genSequence(n + 1, false), genSequence(n + 1, true)];  
  let result = Number(naturals[n]) + Number(squares[n]);
  result += Number(naturals[n + 1]) + Number(squares[n + 1]) >= 10 ? 1 : 0;
  return result < 10 ? result : result - 10;
}

// test cases

const sum = '272619325597593231536305887388';
let expected; 
let result;
for (let i = 0; i < sum.length; i++) {
  [expected, result] = [sum[i], findDigit(i)];
  console.log(`CASE ${i}`)
  console.log(`expected: ${expected}`)
  console.log(`fact: ${result}`);
  console.log(expected == result);
}

// for (let i = 0; i < 10; i++) {
//   console.log(`CASE n === ${i}`);
//   console.log(findDigit(i));
// }


