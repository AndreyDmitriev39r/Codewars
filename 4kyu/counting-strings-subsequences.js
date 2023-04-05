// TASK LINK >>> https://www.codewars.com/kata/52f7892a747862fc9a0009a6

const countSubsequences = (needle, haystack) => {
  // returns the number of subsequences as an integer
  // write your solution here ... 
};

const tests = [
  {
    needle: "happy birthday",
    haystack: "appyh appy birth day",
    expected: 1,
  },
  {
    needle: "happy birthday",
    haystack: "happybirthday",
    expected: 0,
  },
  {
    needle: "happy birthday",
    haystack: "hhaappyy bbiirrtthhddaayy",
    expected: 2048,
  },
];

for (let test of tests) {
  console.log(`test case for needle: ${test.needle}\nhaystack: ${test.haystack}`);
  console.log(`EXPECTED: ${test.expected}`);
  let result = countSubsequences(test.needle, test.haystack);
  console.log(`FACT: ${result}`);
  console.log(`test ${test.expected === result ? "passed" : "failed"}`);
  console.log('*'.repeat(20));
};
