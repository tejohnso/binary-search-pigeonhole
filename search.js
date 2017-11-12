/*
 * Find a duplicate.
 * Input values are in range 1 to length of array.
 * Input has at least one value repeated.
 * Sample input [1, 2, 3, 3, 4] with result = 3.
 * 
 * Binary search performed by value matching half possible values per iteration.
 * For example, in above input length 5, possible values are 1, 2, 3, 4
 *  Is the duplicate 1 or 2? Check the full array for number of matches in range 1 <= v <= 2
 *  If number of matches is greater than range length of 2, duplicate must be in that range,
 *    otherwise duplicate is in next range, 3 or 4 in this case.
 *  Iterate by considering next range half, so consider 3.
 *  Result is determined when ranege length is one and number of matches is greater than 1.
 * 
*/

module.exports = (testSubject)=>{
  if (!Array.isArray(testSubject)) {throw Error("no");}
  if (testSubject.length < 2) {throwError();}

  if (testSubject.length === 2) {return testSubject[1];}

  let numUniqueDigits = testSubject.length - 1;
  let rangeValStart = 1;
  let rangeValEnd = Math.floor((testSubject.length - 1) / 2);
  let duplicateInRange = undefined;

  let n = 0;
  while (n < testSubject.length) {
    n++;
    duplicateInRange = scanRangeMatches(rangeValStart, rangeValEnd);
    console.log(rangeValStart, rangeValEnd, duplicateInRange);

    let rangeLength = rangeValEnd - rangeValStart;

    if (duplicateInRange) {
      if (rangeValEnd === rangeValStart) {return rangeValStart;}
      rangeValEnd = recalcEnd(rangeLength, rangeValStart);
    } else {
      rangeValStart = recalcStartForUpperRange(rangeValEnd);
      rangeValEnd = recalcEnd(rangeLength, rangeValStart);
      rangeValEnd = Math.min(rangeValEnd, numUniqueDigits);
    }
  }

  function recalcStartForUpperRange(prevEnd) {return prevEnd + 1;}

  function recalcEnd(rangeLength, start) {
    return Math.floor((rangeLength) / 2) + start;
  }

  function scanRangeMatches(rangeValStart, rangeValEnd) {
    let numDigitsToMatch = rangeValEnd - rangeValStart + 1;
    let matchedValCount = 0;

    for (let i = 0; i <= testSubject.length; i++) {
      let match = testSubject[i] >= rangeValStart &&
        testSubject[i] <= rangeValEnd; 

      if (match) {matchedValCount++}
    }

    return matchedValCount > numDigitsToMatch;
  }
};

function throwError() {
  const err =
`expecting an array of length n + 1 with unique digits in range 1 to n
plus at lest one duplicate`;
  throw Error(err);
}

