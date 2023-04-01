// TASK LINK >>> https://www.codewars.com/kata/54a91a4883a7de5d7800009c

const incrementString = (str) => {  
  let startOfNumber = str.split("")
    .findLastIndex(char => char.match(/[^\d]/)) + 1;
  let number = str.slice(startOfNumber);
  if (!number) return `${str}1`;
  let newNumber = (Number(number) + 1).toString();
  let leadingZeroes = number.length - newNumber.length < 0
    ? 0 : number.length - newNumber.length;
  return `${str.slice(0, startOfNumber)}${"0".repeat(leadingZeroes)}${newNumber}`;
}

// tests

const tests = [
  {
    input: "foo",
    expected: "foo1",
  },
  {
    input: "foobar23",
    expected: "foobar24",
  },
  {
    input: "foo0042",
    expected: "foo0043",
  },
  {
    input: "foo9",
    expected: "foo10",
  },
  {
    input: "foo099",
    expected: "foo100",
  },
];

let result;

for (let test of tests) {
  console.log(`CASE: ${test.input}`);
  result = incrementString(test.input);
  console.log(`RESULT: ${result}`);
  console.log(`EXPECTED: ${test.expected}`);
  console.log(`test ${result === test.expected ? "passed" : "failed"}`);
  console.log(`***********************`);
};
