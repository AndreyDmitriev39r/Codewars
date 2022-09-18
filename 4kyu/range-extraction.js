// TASK LINK >>> https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/train/javascript

function solution(list){  
  return list.map((el, index) => {
    const [prev, next] = [list[index - 1], list[index + 1]];
    const adjacentToPrev = el === prev + 1;
    const adjacentToNext = el === next - 1;
    return adjacentToPrev && adjacentToNext ? 'g' : el;
  }).join(',').replace(/,g,/g, '-').replace(/(g-)/g, '').replace(/g,/g, '')//refactor with single regexp
 }
// see decent examples of regexps here https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/solutions/javascript
//  TESTS

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]))

console.log("-6,-3-1,3-5,7-11,14,15,17-20")
