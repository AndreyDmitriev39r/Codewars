// TASK LINK >>> https://www.codewars.com/kata/51e056fe544cf36c410000fb

function topThreeWords(text) {
  const words = text.split(/[^(A-Za-z')]/)
    .reduce((arrWords, el) =>
      el === '' || el === "'"
        ? arrWords
        : [...arrWords, el.toLowerCase()], []);
  let wordsMap = {};
  words.forEach(word => word in wordsMap ? wordsMap[word] += 1 : wordsMap[word] = 1);  
  return Object.entries(wordsMap).sort((a, b) => b[1] - a[1]).slice(0, 3).map(el => el[0])  
}

console.log(topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`), ['a','of','on'])