// TASK LINK >>> https://www.codewars.com/kata/59f6e1af3640ce12510000ad

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// generate n-length sequence of natural nums

const genNumSequence = (n) => {
  let result = "";
  let num = 1;
  while (result.length < n) {
    result += num;
    num++
  }
  return Number(result.substring(0, n));
}

// for (let i = 11; i < 19; i++) {
//   console.log(`CASE n=${i}`);
//   console.log(`length of result is ${genNumSequence(i).length}`);
//   console.log(`result is ${genNumSequence(i)}`);
// }


// generate n-length sequence of squares

const genSquareSequence = (n) => {
  let result = "";
  let num = 1;
  while(result.length < n) {
    result += num ** 2;
    num ++;
  }
  return Number(result.substring(0, n));
}

// for (let i = 1; i < 10; i++) {
//   console.log(`CASE n=${i}`);
//   console.log(`length of result is ${genSquareSequence(i).length}`);
//   console.log(`result is ${genSquareSequence(i)}`);
// }

// 272619325597593231536305887388...

const genSequence = (n, isSquare = false) => {
  let result = "";
  let num = 1;
  while(result.length <= n) {
    result += isSquare ? num ** 2 : num;
    num ++;
  }
  return result.substring(0, n + 1).split('').map(el => Number(el));
}

const findDigit = (n) => {  
  const [naturals, squares] = [genSequence(n + 1, false), genSequence(n + 1, true)];  
  let result = naturals[n] + squares[n];
  result += naturals[n + 1] + squares[n + 1] >= 10 ? 1 : 0;
  return result < 10 ? result : result - 10;
}

for (let i = 0; i < 10; i++) {
  console.log(`CASE n === ${i}`);
  console.log(findDigit(i));
}


