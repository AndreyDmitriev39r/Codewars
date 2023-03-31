// TASK LINK >>> https://www.codewars.com/kata/59f6e1af3640ce12510000ad

const getDigitsFromNatSequence = (n) => {
  let result = "";
  let num = 1;
  while(result.length <= n) {
    result += num;
    num ++;
  }
  return [Number(result[n -1]), Number(result[n])];
}

// alternative functions to generate sequences -????????
// note 1
// for generating result >>> only four digits needed
// thus, there should be a way to get those without building dynamically either arrays or strings >> stuck on indexing,
// and stuck on rewriting temp variables properly
// note 2
// there is a pattern in squares sequence, which will allow to build squares only using addition, without ** operation
// !!!REALIZED BELOW - had +perfomance effect, but not enough

const getDigitsFromSquareSequence = (n) => {
  let step = 1;
  let square = 0;
  let result = ''
  while (result.length <= n) {
    square += step;
    result += square;
    step += 2;
  }
  return [Number(result[n -1]), Number(result[n])];
}

// 123456789101121314151617

const newGetDigitFromNat = (n) => {
  let result = {
    leftDigit: 1,
    leftIndex: 0,
    rightDigit: 2,
    rightIndex: 1,
  }
  let length = 2;
  let currNum = 3;
  let currNumFormatted;
  while (length < n + 2) {
    if (currNum < 10) {
      length++;
      result.leftDigit++;
      result.leftIndex++;
      result.rightIndex++;
      result.rightDigit++;
    } else {
      currNumFormatted = currNum.toString();
      console.log(currNumFormatted);
      return;
    }
  }
  return result;
}

// console.log(newGetDigitFromNat(8)){leftDigit: 9, leftIndex: 8, rightDigit: 10, rightIndex: 9}


const findDigit = (n) => {  
  // const [naturals, squares] = [genSequence(n + 1, false), getSquares(n + 1)];
  // let result = Number(naturals[n]) + Number(squares[n]);
  // result += Number(naturals[n + 1]) + Number(squares[n + 1]) >= 10 ? 1 : 0;
  // return result < 10 ? result : result - 10;
  const [natLeft, natRight] = getDigitsFromNatSequence(n + 1);
  const [sqLeft, sqRight] = getDigitsFromSquareSequence(n + 1);
  let result = natLeft + sqLeft;
  result += natRight + sqRight >= 10 ? 1 : 0;
  return result < 10 ? result : result - 10;
}

// test cases

// const sum = '272619325597593231536305887388';
// let expected; 
// let result;
// for (let i = 0; i < sum.length; i++) {
//   [expected, result] = [sum[i], findDigit(i)];
//   console.log(`CASE ${i}`)
//   console.log(`expected: ${expected}`)
//   console.log(`fact: ${result}`);
//   console.log(expected == result);
//   console.log(`*************`);
// }
