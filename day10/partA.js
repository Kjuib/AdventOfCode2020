const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
// const filePath = './inputTestB.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    const sorted = _.orderBy(input);

    const results = {
        1: 0,
        2: 0,
        3: 0
    }

    for (let i = 0; i < sorted.length; i++) {
        const current = sorted[i];
        const prev = sorted[i - 1] || 0;
        const diff = current - prev;

        results[diff]++;
    }

    results[3]++; // For the device

    console.log('results', results);

    console.log('Total:', results[1] * results[3]);
}

main();
