const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
// const filePath = './inputTestB.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    const sorted = _.orderBy(input);
    sorted.unshift(0);

    const branches = _.map(sorted, () => 0);
    branches[0] = 1;

    for (let i = 0; i < sorted.length; i++) {
        for (let j = i - 3; j < i; j++) {
            if (sorted[i] <= sorted[j] + 3) {
                branches[i] += branches[j];
            }
        }
    }

    console.log('branches', branches);
    console.log('RESULT', _.last(branches));
}

main();
