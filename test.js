const search = require("./search");
const sfy = JSON.stringify;
const testCount = 20;
const maxDigits = 5000;
const assert = require("assert");
const oneToLen = len=>Math.floor(Math.random() * len + 1);

for (let i = 0; i < testCount; i++) {
  let digits = Math.floor(Math.random() * maxDigits + 1);
  let nums = Array.from({length:digits}, (e, i)=>i+1);

  //console.log(`digits ${digits}`, sfy(nums));
  let scrambled = [];
  while (nums.length) {
    scrambled = scrambled.concat(nums.splice(Math.floor(Math.random() * nums.length), 1));
  }
  assert(scrambled.length === digits);

  let dupe = oneToLen(digits);
  let testSubject = [...scrambled];
  assert(dupe >= 1 && dupe <= digits);
  testSubject.splice(oneToLen(digits), 0, dupe);
  //console.log(`dupe ${dupe}${" ".repeat(dupe < 10 && digits > 10 ? 1 : 0)}  `, sfy(testSubject));
  assert(testSubject.length === digits + 1);

  let searchResult = search(testSubject);
  console.log(searchResult);
  assert(searchResult === dupe);
  console.log("");
}

console.dir({testCount, maxDigits}, {colors: true});