// TASK LINK >>> https://www.codewars.com/kata/59f6e1af3640ce12510000ad

const getSubSequenceSize = subSequence => 9 * Math.pow(10, subSequence - 1) * subSequence;

const getNthDigitFromNaturals = (n) => {  
  const position = n + 1;
  let resultLengthDigits = 0;
  let resultLengthNumbers = 0;  
  let subSequence = 1;
  while (position > getSubSequenceSize(subSequence) + resultLengthDigits) {    
    resultLengthDigits += getSubSequenceSize(subSequence);
    resultLengthNumbers += 9 * Math.pow(10, subSequence - 1);    
    subSequence++;
  }; 
  const positionInSubSequence = position - resultLengthDigits;  
  const nthNumberInSubSequence = Math.ceil(positionInSubSequence / subSequence);  
  const posOfDigitInNthNumber = positionInSubSequence - ((nthNumberInSubSequence - 1) * subSequence);  
  const num = resultLengthNumbers + nthNumberInSubSequence;
  return Number(num.toString()[posOfDigitInNthNumber - 1]);
};

const getLargestNDigitSquarePos = (digit) => {
  const rawValue = Math.sqrt((Math.pow(10, digit)));
  return Number.isInteger(rawValue) ? rawValue - 1
    : Math.floor(rawValue);
}

const getSquareSubSequenceLength = (sequence) =>
  (getLargestNDigitSquarePos(sequence) - getLargestNDigitSquarePos(sequence - 1)) * sequence;

const getNthDigitFromSquares = (n) => {
  const position = n + 1;
  let resultLengthDigits = 0;
  let resultLengthNumbers = 0;
  let subSequence = 1;
  while (position > getSquareSubSequenceLength(subSequence) + resultLengthDigits) {
    resultLengthDigits += getSquareSubSequenceLength(subSequence);
    resultLengthNumbers += getLargestNDigitSquarePos(subSequence);
    subSequence++;
  }  
  const positionInSubSequence = position - resultLengthDigits;  
  const nthNumberInSubSequence = Math.ceil(positionInSubSequence / subSequence);  
  const posOfDigitInNthNumber = positionInSubSequence - ((nthNumberInSubSequence - 1) * subSequence);
  const num = (getLargestNDigitSquarePos(subSequence - 1) + nthNumberInSubSequence) ** 2;  
  return Number(num.toString()[posOfDigitInNthNumber - 1]);
}

const findDigit = (n) => {  
  const rightMostNat = getNthDigitFromNaturals(n);
  const rightMostSq = getNthDigitFromSquares(n);
  let rightShift = 1;
  let leftMostNat = getNthDigitFromNaturals(n + rightShift);
  let leftMostSq = getNthDigitFromSquares(n + rightShift);
  let natOperand = [rightMostNat, leftMostNat];
  let sqOperand = [rightMostSq, leftMostSq];  
  while (leftMostNat + leftMostSq === 9) {    
    leftMostNat = getNthDigitFromNaturals(n + rightShift + 1);
    leftMostSq = getNthDigitFromSquares(n + rightShift + 1);
    natOperand.push(leftMostNat);
    sqOperand.push(leftMostSq);
    rightShift++;
  };  
  const sum = natOperand.map((digit, index) => digit + sqOperand[index]);  
  let result = sum[sum.length - 1];
  for (let i = sum.length - 2; i >= 0; i--) {
    result = result >= 10 ? sum[i] + 1 : sum[i];    
  };
  return result >= 10 ? result - 10 : result;
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
};

let num = 410007382 ;

console.log(findDigit(num)); 