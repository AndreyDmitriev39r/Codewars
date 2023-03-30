// TASK LINK >>> https://www.codewars.com/kata/59f6e1af3640ce12510000ad

const genSequence = (n, isSquare = false) => {
  let result = "";
  let num = 1;
  while(result.length <= n) {
    result += num;
    num ++;
  }
  return result.substring(0, n + 1);
}

// alternative functions to generate sequences
// note 1
// for generating result >>> only four digits needed
// thus, there should be a way to get those without building dynamically either arrays or strings
// note 2 - !!!REALIZED BELOW - had effect, but not enough
// there is a pattern in squares sequnce, which will allow to build squares only using addition, without ** operation

const getSquares = (n) => {
  let step = 1;
  let square = 0;
  let result = ''
  while (result.length <= n) {
    square += step;
    result += square;
    step += 2;
  }
  return result.substring(0, n + 1);
}

const findDigit = (n) => {  
  const [naturals, squares] = [genSequence(n + 1, false), getSquares(n + 1)];
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
