// TASK LINK >>> https://www.codewars.com/kata/5782b5ad202c0ef42f0012cb/train/javascript

// constants

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const getCharSequence = (firstChar, lastChar) =>
  range(firstChar.charCodeAt(0), lastChar.charCodeAt(0), 1).map(code => String.fromCharCode(code));

const upperCaseAlphabet = getCharSequence('A', 'Z');
const lowerCaseAlphabet = getCharSequence('a', 'z');
const digits = getCharSequence('0', '9');
const nonAlphaNums = Array.from(".,:;-?! '()$%&\"");

const hashMap = new Map(Object.entries([
  ...upperCaseAlphabet,
  ...lowerCaseAlphabet,
  ...digits,
  ...nonAlphaNums
]).map(([idx, char]) => [char, idx]));

// utils

const isText = (text) => text !== null && text.length > 0;

const isValidText = (text, dict) => {
  for (let char of text) {
    if (!dict.has(char)) {
      throw new Error("invalid characters are present in the text");
    }
  }
  return;
};

const changeCaseForEven = text => {
  let newText = '';
  for (let i = 0; i < text.length; i++) {
    if (i % 2 !== 0) {
      newText += text[i] === text[i].toLowerCase()
        ? text[i].toUpperCase()
        : text[i].toLowerCase()
    } else {
      newText += text[i];
    }
  }  
  return newText;
};

// concise approach for case swapping

// const text = "HELLO";
// const inverted = text.replace(/[a-zA-Z]{2}/g, ([i, c]) => 
//      i + String.fromCharCode((c.charCodeAt(0) & 32 ^ 32) | c.charCodeAt(0) & 223));
// console.log(inverted); //= "HeLlO";

const getKeyfromValue = (searchValue, dict) => {
  for (let [key, value] of dict.entries()) {
    if (value === searchValue) return key;
  }
};

const getMirror = (key, dict) => getKeyfromValue(String(dict.size - dict.get(key) - 1), dict);

const shiftAddress = (num1, num2, length) => num1 - num2 < 0 ? num1 - num2 + length : num1 - num2;

// main

const encrypt = text => {
  if (!isText(text)) return text;
  isValidText(text, hashMap);
  let shiftedCase = changeCaseForEven(text);
  let encryptedText = getMirror(text[0], hashMap);
  for (let i = 1; i < shiftedCase.length; i++) {
    const newAddress
      = shiftAddress(hashMap.get(shiftedCase[i - 1]), hashMap.get(shiftedCase[i]), hashMap.size);
    encryptedText += getKeyfromValue(String(newAddress), hashMap);
  }
  return encryptedText;
};

encrypt("Business");

const decrypt = encryptedText => {
  if (!isText(encryptedText)) return encryptedText;
  isValidText(encryptedText, hashMap);
  let text = getMirror(encryptedText[0], hashMap);  
  for (let i = 1; i < encryptedText.length; i++) {
    let unshiftedAddress
      = shiftAddress(hashMap.get(text[text.length - 1]), hashMap.get(encryptedText[i]), hashMap.size);    
    text += getKeyfromValue(String(unshiftedAddress), hashMap);    
  }  
  return changeCaseForEven(text);
}

decrypt("&61kujla");
