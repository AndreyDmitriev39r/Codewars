// TASK LINK >>> https://www.codewars.com/kata/59031db02b0070a923000110/train/javascript

// You are given an odd integer n and a two-dimensional array s, which contains n equal-sized arrays of 0s and 1s.

// Return an array of the same length as the elements of n, such that its ith element is the one that appears most frequently at the ith position of s' elements.

// verbose

// const zeroOrOne = (n, s) => {
//   console.log(
//     s.reduce((res, el) => {
//       console.log(res)
//       console.log(el)
//       console.log('stuff')
//       return res.map((resEl, index) => resEl + el[index])
//     }, Array(n).fill(0)).map(el => el < n /2 ? 0 : 1)
      
//   )
// }


// 106 char solution
// const zeroOrOne=(n,s)=>s.reduce((a,e)=>a.map((b,i)=>b+e[i]),Array(s[0].length).fill(0)).map(e=>e<n/2?0:1);

// 65 char solution - 1 char off

zeroOrOne=(n,s)=>s[0].map((e,i)=>s.reduce((a,e)=>a+e[i],0)>n/2|0)

let a = zeroOrOne(5,[
  [1,0,0,0,0], 
  [0,1,0,0,0], 
  [0,0,1,0,0], 
  [0,0,0,1,0], 
  [0,0,0,0,1]])

let b =zeroOrOne(1,[[1,1,0,1]])//[1, 1, 0, 1]
console.log(a);
console.log(b);
//  [0, 0, 0, 0, 0]