// TASK LINK >>> https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c

// O(n) solution - Kadane's algo

const maxSequence = (arr) => {
  if (!arr.length) {return 0;}
  if (arr.every(el => el < 0)) {return 0;}
  let result = arr[0];
  let localMax = arr[0];
  for (let i = 1; i < arr.length; i++) {
    localMax = localMax + arr[i] < arr[i]
      ? arr[i]
      : localMax + arr[i] 
    result = localMax > result
      ? localMax
      : result
  }  
  return result;
}

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]);