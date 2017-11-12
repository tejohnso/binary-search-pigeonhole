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

module.exports = (testSubject, log = ()=>{})=>{
  if (!Array.isArray(testSubject)) {throwError();}
  const len = testSubject.length;
  const adjustMatches = setMatches.bind(null, testSubject);

  if (len < 2) {throwError();}
  if (len === 2) {return testSubject[1];}
  if (testSubject.some(e=>e < 1 || e > len - 1)) {throwError();}

  let iterState = {
    floor: 1,
    ceil: len - 1,
    mid: Math.floor(len / 2),
    matches: 0
  };

  while (iterState.floor < iterState.ceil) {
    iterState = adjustRange(adjustMatches(iterState));
    log(iterState);
  }

  return iterState.floor;
};

function setMatches(targetArr, iterState) {
  const {floor, mid} = iterState;
  const matches = targetArr.reduce((matches, e)=>{
    return e >= floor && e <= mid ? matches + 1 : matches;
  }, 0);

  return { ...iterState, matches};
}

function adjustRange(iterState) {
  let {matches, mid, floor, ceil} = iterState;
  const inLowerRange = matches > (mid - floor + 1);

  ceil = inLowerRange ? mid : ceil;
  floor = inLowerRange ? floor : mid + 1;
  mid = Math.floor((ceil - floor) / 2) + floor;

  return {...iterState, ceil, floor, mid};
}

function throwError() {
  const err =
`expecting an array of length n + 1 having unique digits in range 1 to n
plus at lest one duplicate`;
  throw Error(err);
}
