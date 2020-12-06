const _ = require('lodash');
const fs = require('fs');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n\n');
    const correctedInput = _.map(listInput, (row) => {
        return row.replace(/\n/g, '').split('');
    });

    return correctedInput;
}

function main() {
    const input = loadInput(filePath);

    const unique = _.map(input, (group) => {
        return _.uniq(group);
    });

    const counts = _.map(unique, _.size);

    const total = _.sum(counts);

    console.log('total', total);
}

main();
