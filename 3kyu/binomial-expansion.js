// TASK LINK >>> https://www.codewars.com/kata/540d0fdd3b6532e5c3000b5b/train/javascript

function expand(expr) {
  
}

// TESTS

const basicTests1 = [
  ["(x-1)^0","1"],
  ["(x-1)^1","x-1"],
  ["(x-1)^2","x^2-2x+1"]
];

const Tests = [
  ["(5m+3)^4","625m^4+1500m^3+1350m^2+540m+81"],
  ["(2x-3)^3","8x^3-36x^2+54x-27"],
  ["(7x-7)^0", "1"]
]

// more raw examples

// expand("(x+1)^2");      // returns "x^2+2x+1"
// expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
// expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
// expand("(-2a-4)^0");    // returns "1"
// expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
// expand("(r+0)^203");    // returns "r^203"
// expand("(-x-1)^2");     // returns "x^2+2x+1"