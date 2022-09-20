// TASK LINK >>> https://www.codewars.com/kata/51c8e37cee245da6b40000bd/train/javascript

function solution(input, markers) {  
  return input.split('\n')
    .map(el => {
      let formatted = ""
      for (let char of el) {
        if (markers.includes(char)) {
          break;
        }
        formatted += char;
      }
      return formatted.trim();
    }).join('\n');
};

console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]))
console.log("apples, plums\npears\noranges")