const _ = require('lodash');
const fs = require('fs');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n\n');
    const correctedInput = _.map(listInput, (row) => {
        return _.compact(row.split('\n'));
    });

    return correctedInput;
}

function main() {
    const input = loadInput(filePath);

    const scores = _.map(input, (group) => {
        const first = group[0];
        const rest = _.tail(group);
        
        const score = _.reduce(first, (acc, letter) => {
            if (_.every(rest, (other) => {
                return _.includes(other, letter);
            })) {
                acc++;
            }

            return acc;
        }, 0);


        console.log('score', score);
        return score;
    });

    const total = _.sum(scores);
    console.log('total', total);
}

main();
