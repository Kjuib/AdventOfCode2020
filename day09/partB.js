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

            if (num1 + num2 === needle) {
                return true;
            }
        }
    }

    return false;
}

function scanInvalid(target, input) {
    for (let i = 0; i < input.length; i++) {
        let subtotal = input[i];
        for (let j = i + 1; j < input.length && subtotal < target; j++) {
            subtotal += input[j];

            if (subtotal === target) {
                console.log('FOUND IT', i, j);
                const subRange = _.slice(input, i, j + 1);
                console.log('subRange', subRange);
                const weakness = _.min(subRange) + _.max(subRange);
                console.log('weakness', weakness);
            }
        }
    }
}

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    for (let i = preamble; i < input.length; i++) {
        const current = input[i];
        const scanList = _.slice(input, i - preamble, i);

        if (!isValid(current, scanList)) {
            console.log('NOT VALID', current);
            scanInvalid(current, input);
        }
    }
}

main();
