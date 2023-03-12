// TASK LINK >>> https://www.codewars.com/kata/540d0fdd3b6532e5c3000b5b/train/javascript
// maths
//  https://en.wikipedia.org/wiki/Binomial_theorem
//  https://en.wikipedia.org/wiki/Binomial_coefficient

// utils

const factorial = (num) => {
  let result = 1;
  let copyNum = num;
  while (copyNum > 0) {
    result *= copyNum;
    copyNum--;
  }
  return result;
}

const getBinomialCoefficient = (power, index) => {
  return factorial(power) / (factorial(index) * factorial(power - index));
}

const expandLetter = (letter, num) =>
  `${num === 0 ? "" : num === 1 ? letter : letter + "^" + num}`

// main

function expand(expr) {

  // extracting coefficients  
  const nums = expr
    .split(/[^\d-+]/)
    .filter(el => el.length)
    .map(el => el === '-' ? -1 : Number(el));  
  if (nums.length === 2) nums.unshift(1);  
  const [a, b, power] = nums;
  const letter = expr.match(/[a-z]/)[0];

  // edge cases
  if (power === 0) {return '1';}
  if (b === 0) {return `${Math.pow(a, power)}${letter}^${power}`}

  // **expanding
  // *expanding letter
  let result = Array(power + 1).fill(null);
  result = result.map((el, index) => expandLetter(letter, result.length - index - 1));
  // *expanding binomial coefficients, a and b
  let expandedNumbers = Array(power + 1).fill(null);  
  expandedNumbers = expandedNumbers.map((el, index) =>
    getBinomialCoefficient(power, index) * Math.pow(a, power - index) * Math.pow(b, index)
  );

  // combining result
  result = result.map((el, index) =>
    expandedNumbers[index] === 0 ? ""
      : index === 0 && expandedNumbers[index] === 1 ? el
      : index === 0 && expandedNumbers[index] === -1 ? '-' + el
      : expandedNumbers[index] + el
    );
  
  // formatting result  
  return result.join('+').replace(/\+\-/g, '-');
}

// TESTS

const basicTests1 = [
  ["(x-1)^0","1"],
  ["(x-1)^1","x-1"],
  ["(x-1)^2","x^2-2x+1"]
];


for (let test of basicTests1) {
  console.log (expand(test[0]));
  console.log('expected  ', test[1]);
  console.log(expand(test[0]) === test[1]);
  console.log('---------');
}

const Tests = [
  ["(5m+3)^4","625m^4+1500m^3+1350m^2+540m+81"],
  ["(2x-3)^3","8x^3-36x^2+54x-27"],
  ["(7x-7)^0", "1"],
  ["(-12t+43)^2", "144t^2-1032t+1849"]
]

for (let test of Tests) {
  console.log (expand(test[0]));
  console.log('expected  ', test[1]);
  console.log(expand(test[0]) === test[1]);
  console.log('---------');
}

// more raw examples

// expand("(x+1)^2");      // returns "x^2+2x+1"
// expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
// expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
// expand("(-2a-4)^0");    // returns "1"
// expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
// expand("(r+0)^203");    // returns "r^203"
// expand("(-x-1)^2");     // returns "x^2+2x+1"