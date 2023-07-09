const search = (number, range = [0, 10000]) => {
  let turns = 0;

  while (range[0] <= range[1]) {
    turns++;

    const middle = Math.floor((range[0] + range[1]) / 2);
    if (middle === number) {
      return { number: middle, turns };
    }

    if (middle < number) {
      range[0] = middle + 1;
    } else {
      range[1] = middle - 1;
    }
  }

  return { number: null, turns };
};

const validateNumber = (number, min, max) => {
  if (
    typeof number !== 'number' ||
    isNaN(number) ||
    number < min ||
    number > max
  ) {
    throw new Error(
      `The number entered (${number}) must be a number within the range [${min}, ${max}]`
    );
  }
};

const number = parseInt(process.argv[2]);
const range = [0, 10000];
validateNumber(number, range[0], range[1]);

const { number: foundNumber, turns } = search(number);
console.log(`The number was ${foundNumber}`);
console.log(`I found it in ${turns} turns`);
