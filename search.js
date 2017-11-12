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
  if (!Array.isArray(testSubject)) {throwError();}
  const len = testSubject.length;

  if (len < 2) {throwError();}
  if (len === 2) {return testSubject[1];}
  if (testSubject.some(e=>e < 1 || e > len - 1)) {throwError();}

  let floor = 1;
  let ceil = len - 1;

  while (floor < ceil) {
    let mid = Math.floor((ceil - floor) / 2) + floor;

    let matchCount = testSubject.reduce((matches, e)=>{
      return e >= floor && e <= mid ? matches + 1 : matches;
    }, 0);

    //console.log(floor, mid, ceil, matchCount > (mid - floor + 1));
    if (matchCount > (mid - floor + 1)) {
      ceil = mid;
    } else {
      floor = mid + 1;
    }
  }

  return floor;
};

function throwError() {
  const err =
`expecting an array of length n + 1 with unique digits in range 1 to n
plus at lest one duplicate`;
  throw Error(err);
}

