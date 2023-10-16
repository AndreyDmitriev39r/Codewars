// TASK LINK https://www.codewars.com/kata/568fca718404ad457c000033

// find comm difference
// then calculate difference between sum of given sequence and sum of fully complete arythmetic progression
// the latter would be missing number

function find(seq) {  
  let [min, max] = [seq[0], seq[0]];
  for (let i = 1; i < seq.length; i++) {    
    min = min <= seq[i] ? min : seq[i];
    max = max >= seq[i] ? max : seq[i]; 
  }  
  let commDiff = (max - min) / seq.length;
  let fullSum = (seq.length + 1) * (max + min) / 2; 
  return fullSum - seq.reduce((acc, el) => acc + el, 0);
}

find([3, 9, 1, 11, 13, 5]);