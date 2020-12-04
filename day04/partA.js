const _ = require('lodash');
const fs = require('fs');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n\n');
    const correctedInput = _.map(listInput, (row) => {
        return row.replace(/\n/g, ' ');
    });

    return correctedInput;
}

function main() {
    const input = loadInput(filePath, { isGrid: true });

    const isValid = _.map(input, (passport) => {
        return (
            _.includes(passport, 'byr:') &&
            _.includes(passport, 'iyr:') &&
            _.includes(passport, 'eyr:') &&
            _.includes(passport, 'hgt:') &&
            _.includes(passport, 'hcl:') &&
            _.includes(passport, 'ecl:') &&
            _.includes(passport, 'pid:')
        );
    });

    const counts = _.countBy(isValid);

    console.log('counts', counts);
}

main();
