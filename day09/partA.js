const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

// const preamble = 5;
const preamble = 25;

function isValid(needle, haystack) {
    for (let i = 0; i < haystack.length; i++) {
        const num1 = haystack[i];
        for (let j = i + 1; j < haystack.length; j++) {
            const num2 = haystack[j];

            // console.log('checking...', num1, num2, num1 + num2, needle);
            if (num1 + num2 === needle) {
                return true;
            }
        }
    }

    return false;
}

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    for (let i = preamble; i < input.length; i++) {
        const current = input[i];
        const scanList = _.slice(input, i - preamble, i);

        if (!isValid(current, scanList)) {
            console.log('NOT VALID', current);
        }
    }
}

main();
