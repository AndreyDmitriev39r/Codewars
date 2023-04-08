// TASK LINK >>> https://www.codewars.com/kata/52f7892a747862fc9a0009a6

const getLookupCarcass = needle => Array.from(needle).reduce((acc, _, i) => ({...acc, [i]: []}), {});

const needleCharsInHayStack = (needle, haystack) => {
  const lookup = getLookupCarcass(needle);
  for (let i = 0; i < needle.length; i++) {
    for (let j = 0; j < haystack.length; j++) {
      if (needle[i] === haystack[j]) {
        i === 0 ? lookup[i].push([j, 1]) : lookup[i].push([j, 0]);
      }
    }
  }
  return lookup;
}

const countSubsequences = (needle, haystack) => {
  const lookup = needleCharsInHayStack(needle, haystack);
  for (let i = 1; i < needle.length; i++) {    
    for (let char of lookup[i]) {
      for (let prevChar of lookup[i - 1]) {
        if (char[0] > prevChar[0]) char[1] += prevChar[1];        
      }
    }
  }
  return lookup[needle.length - 1].reduce((result, el) => result + el[1], 0);
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
