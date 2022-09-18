// TASK LINK >>> https://www.codewars.com/kata/5629db57620258aa9d000014/javascript

// helpers

const cleaner = (str) => {
  return str.match(/[a-z]/g).join('');
}

const mapBuilder = (str) => {
  const lettersMap = {};
  for (let letter of str) {    
    letter in lettersMap
      ? lettersMap[letter] += 1
      : lettersMap[letter] = 1;
  }
  return lettersMap;
}

const moreThanOne = (map1, map2, key) => {
  return [map1[key], map2[key]]
    .some(el => (el !==1) && (el !== undefined));
}

const prefixAndSequenceSource = (map1, map2, key) => {  
  const [val1, val2] = [map1[key], map2[key]].map(el => el === undefined ? 0 : el);
  const max = Math.max(val1, val2);  
  return val1 === val2 ? ['=:', map1]
    : val1 === max
    ? ['1:', map1]
    : ['2:', map2];
}

const compareFn = (prev, next) => {
  const orderedPrefixes = ['1', '2', '='];
  if (prev.length !== next.length) {
    return next.length - prev.length;
  } else if (prev[0] !== next[0]) {  
    return orderedPrefixes.indexOf(prev[0]) - orderedPrefixes.indexOf(next[0]);
  } else {    
    return prev.codePointAt(2) - next.codePointAt(2);
  }  
}

// main

function mix(s1, s2) {  
  const map1 = mapBuilder(cleaner(s1));
  const map2 = mapBuilder(cleaner(s2));
  const keys = new Set(Object.keys(map1).concat(Object.keys(map2)));
  const resultArray = [];
  keys.forEach(key => {    
    if (moreThanOne(map1, map2, key)) {
      const [prefix, sequenceSource] = prefixAndSequenceSource(map1, map2, key);      
      resultArray.push(prefix + key.repeat(sequenceSource[key]));
    }
  })  
  return resultArray.sort(compareFn).join('/');
}

const simpleTest = ["looping is fun but dangerous", "less dangerous than coding", "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg"];
console.log('Simple Test')
console.log('EXPECTED  ', "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt")
console.log('RESULT  ', mix(" In many languages", " there's a pair of functions"))
console.log('beep,  ', "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt");
console.log('boop,  ',mix(" In many languages", " there's a pair of functions"));