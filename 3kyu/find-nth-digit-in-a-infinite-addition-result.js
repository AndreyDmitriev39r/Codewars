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

// OPTIMIZATION EFFORT >>> goal - avoid building of the whole sequence

const getDigitsFromNatSequence2 = (n) => {
  
  let sequenceLength = 0;
  let currentNumber = 1;
  let lengthToAdd;
  let currentNumberAsString;
  
  while (sequenceLength <= n + 1) {
    currentNumberAsString = currentNumber.toString();
    lengthToAdd = currentNumberAsString.length;
    if (sequenceLength + lengthToAdd >= n + 1) {
      //this block should fire WHEN required digit
      // somewhere in the current Number
      // console.log(currentNumber);
      
      let digit = currentNumberAsString[0]
      let digitPosInSequence = sequenceLength;
      let digitPosInNumber = 0;
      
      while (digitPosInSequence !== n) {
        digitPosInNumber++
        digitPosInSequence++
        digit = currentNumberAsString[digitPosInNumber];
      }
      // after the above loop digit with position n should be
      // assigned to digit
      // console.log(digit)
      
      // for getting digit on n + 1 position >>>
      // different steps depending on
      // do we need to get next number or not
      
      nextDigit = digitPosInNumber !== lengthToAdd - 1
        ? currentNumberAsString[digitPosInNumber + 1]
        : (currentNumber + 1).toString()[0];
      
      return [Number(digit), Number(nextDigit)];
      
    }
    
    currentNumber++;
    sequenceLength += lengthToAdd;
  }
  return 'some stuff definitely went wrong if we not return early'
}

// ~~~~~~test block for getDigitsFromNatSequence2

let natSequence = "";
for (let i = 1; i < 100; i++) {
  natSequence += i;
};
// console.log(natSequence)

// for n === x >>> results should be [natSequence[x], natSequence[x + 1]]

// UNCOMMENT BELOW
// for (let n = 0; n < 20; n++) {
//   console.log(`CASE n === ${n}`);
//   console.log(`EXPECTED:`);
//   console.log([Number(natSequence[n]), Number(natSequence[n + 1])])
//   console.log(`RESULT:`);
//   console.log(getDigitsFromNatSequence(n));
//   console.log(`***************`)
// };
// UNCOMMENT ABOVE

// ~~~~~~end of test block for getDigitsFromNatSequence2

const getDigitsFromSquareSequence2 = (n) => {
  let sequenceLength = 0;
  let currentNumber = 1;
  let lengthToAdd;
  let currentNumberAsString;
  let step = 3;

  while (sequenceLength <= n + 1) {
    currentNumberAsString = currentNumber.toString();
    lengthToAdd = currentNumberAsString.length;

    if (sequenceLength + lengthToAdd >= n + 1) {
      let digit = currentNumberAsString[0]
      let digitPosInSequence = sequenceLength;
      let digitPosInNumber = 0;
      
      while (digitPosInSequence !== n) {
        digitPosInNumber++
        digitPosInSequence++
        digit = currentNumberAsString[digitPosInNumber];
      }
      
      nextDigit = digitPosInNumber !== lengthToAdd - 1
        ? currentNumberAsString[digitPosInNumber + 1]
        : (currentNumber + step).toString()[0];

      return [Number(digit), Number(nextDigit)];

    }
    currentNumber += step;
    sequenceLength += lengthToAdd;
    step += 2;
  }
  return 'some stuff definitely went wrong if we not return early';
}

// ~~~~test block for getDigitsFromSquareSequence2

let sqSequence = "";
for (let i = 1; i < 30; i++) {
  sqSequence += i ** 2;  
}
// console.log(sqSequence);
// for n === x >>> results should be [natSequence[x], natSequence[x + 1]]

// UNCOMMENT BELOW
// for (let n = 0; n < 20; n++) {
//   console.log(`CASE n === ${n}`);
//   console.log(`EXPECTED:`);
//   console.log([Number(sqSequence[n]), Number(sqSequence[n + 1])])
//   console.log(`RESULT:`);
//   console.log(getDigitsFromSquareSequence2(n));
//   console.log(`***************`)
// };
// UNCOMMENT ABOVE


// ~~~~end of test block for getDigitsFromSquareSequence2

const findDigit = (n) => {  
  const [natLeft, natRight] = getDigitsFromNatSequence2(n);
  const [sqLeft, sqRight] = getDigitsFromSquareSequence2(n);
  let result = natLeft + sqLeft;
  result += natRight + sqRight >= 10 ? 1 : 0;
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
  console.log(`*************`);
}
