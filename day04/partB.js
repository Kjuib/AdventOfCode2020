const _ = require('lodash');
const fs = require('fs');

// const filePath = './inputTestB.txt';
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
            /byr:(19[2-9][0-9]|200[0-2])(\s|$)/.test(passport) &&
            /iyr:(201[0-9]|2020)(\s|$)/.test(passport) &&
            /eyr:(202[0-9]|2030)(\s|$)/.test(passport) &&
            /hgt:(1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)(\s|$)/.test(passport) &&
            /hcl:#[0-9a-f]{6}(\s|$)/.test(passport) &&
            /ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/.test(passport) &&
            /pid:[0-9]{9}(\s|$)/.test(passport)
        );
    });

    const counts = _.countBy(isValid);

    console.log('counts', counts);
}

main();

// to high 112
