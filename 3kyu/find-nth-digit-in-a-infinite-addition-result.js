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

// let natSequence = "";
// for (let i = 1; i < 100; i++) {
//   natSequence += i;
// };
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

// let sqSequence = "";
// for (let i = 1; i < 30; i++) {
//   sqSequence += i ** 2;  
// }
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

// PERFOMANCE EFFORT

const getSubSequenceSize = subSequence => 9 * Math.pow(10, subSequence - 1) * subSequence;

const getNthDigitFromNaturals = (n) => {
  // according to task, indexes in sequence are zero-based, but it is easier to proceed as if it is 1-based
  const position = n + 1;
  let previousLengthDigits = 0;
  let previousLengthNumbers = 0;
  //subsequence = 1 >>> means n somewhere in 123456789; subsequence = 2 >>> means n somewhere in 10...99
  let subSequence = 1;
  while (position > getSubSequenceSize(subSequence) + previousLengthDigits) {    
    previousLengthDigits += getSubSequenceSize(subSequence);
    previousLengthNumbers += 9 * Math.pow(10, subSequence - 1);    
    subSequence++;
  };
  // console.log('position', position, "previouslennum", previousLengthNumbers)
  // console.log(subSequence, previousLengthinDigits);
  // at this point we know where n belongs: 1-digit, 2-digit or whatever n-digit subsequence
  const positionInSubSequence = position - previousLengthDigits;
  // further step >>> find which number holds nth digit  
  const nthNumberInSubSequence = Math.ceil(positionInSubSequence / subSequence);
  // console.log(nthNumberInSubSequence);
  // NOW we need to find 2 things - position of digit in the number(idea - use subtraction)
  const posOfDigitInNthNumber = positionInSubSequence - ((nthNumberInSubSequence - 1) * subSequence);
  // console.log(posOfDigitInNthNumber);
  const num = previousLengthNumbers + nthNumberInSubSequence;
  return Number(num.toString()[posOfDigitInNthNumber - 1]);
};

// END OF PERFOMANCE EFFORT 3

// PERFOMANCE EFFORT 4

const getLargestNDigitSquarePos = (digit) => {
  const rawValue = Math.sqrt((Math.pow(10, digit)));
  return Number.isInteger(rawValue) ? rawValue - 1
    : Math.floor(rawValue);
}

const getSquareSubSequenceLength = (sequence) =>
  (getLargestNDigitSquarePos(sequence) - getLargestNDigitSquarePos(sequence - 1)) * sequence;

// for (let i = 1; i < 5; i++) {
//   console.log(getLargestNDigitSquarePos(i));
//   console.log(getSquareSubSequenceLength(i));
//   console.log("*".repeat(20));
// }

const getNthDigitFromSquares = (n) => {
  const position = n + 1;
  let previousLengthDigits = 0;
  let previousLengthNumbers = 0;
  let subSequence = 1;
  while (position > getSquareSubSequenceLength(subSequence) + previousLengthDigits) {
    previousLengthDigits += getSquareSubSequenceLength(subSequence);
    previousLengthNumbers += getLargestNDigitSquarePos(subSequence);
    subSequence++;
  }
  // console.log(`n === ${n}`);
  // console.log(`position === ${position}`);
  // console.log(`subsequence === ${subSequence}`);
  const positionInSubSequence = position - previousLengthDigits;
  // console.log(positionInSubSequence);
  const nthNumberInSubSequence = Math.ceil(positionInSubSequence / subSequence);
  // console.log(nthNumberInSubSequence);
  const posOfDigitInNthNumber = positionInSubSequence - ((nthNumberInSubSequence - 1) * subSequence);
  const num = (getLargestNDigitSquarePos(subSequence - 1) + nthNumberInSubSequence) ** 2;
  // console.log(num)
  return Number(num.toString()[posOfDigitInNthNumber - 1]);
}

// 149.162536496481.100121144169......

// for (let i = 0; i < 26; i++) {
//   console.log(getNthDigitFromSquares(i));
//   console.log('*'.repeat(16));
// }

// END OF PERFOMANCE EFFORT 4

const getTail = (n) => {
  if (getNthDigitFromSquares(n + 1) + getNthDigitFromNaturals(n + 1) !== 9) {
    return 0;
  } else {
    console.log('diving into recursion', n);
    return getTail(n + 1) + getNthDigitFromSquares(n + 2) + getNthDigitFromNaturals(n + 2) >= 10
      ? 1 : 0;
  }
};

const findDigit = (n) => {  
  const [natLeft, natRight] = [getNthDigitFromNaturals(n), getNthDigitFromNaturals(n + 1)];
  const [sqLeft, sqRight] = [getNthDigitFromSquares(n), getNthDigitFromSquares(n + 1)];  
  let result = natLeft + sqLeft;  
  const tail = getTail(n);  
  result += tail + natRight + sqRight >= 10 ? 1 : 0;
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
// };

// console.log([getNthDigitFromNaturals(58), getNthDigitFromNaturals(58 + 1), getNthDigitFromNaturals(58 + 2)])
// console.log([getNthDigitFromSquares(58), getNthDigitFromSquares(58 + 1), getNthDigitFromSquares(58 + 2)])


let num = 2047940868;

console.log(getNthDigitFromNaturals(num), getNthDigitFromNaturals(num + 1), getNthDigitFromNaturals(num + 2));
console.log(getNthDigitFromSquares(num), getNthDigitFromSquares(num + 1), getNthDigitFromSquares(num + 2));

console.log(findDigit(num)); //expected 4 >>> fact 3