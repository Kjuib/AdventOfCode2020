const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);

    const policies = _.map(input, (line) => {
        const regexResults = /(\d+)-(\d+)\s(\D):\s(\D+)/.exec(line);

        return {
            password: regexResults[4],
            letter: regexResults[3],
            pos1: _.parseInt(regexResults[1]),
            pos2: _.parseInt(regexResults[2])
        };
    });

    const test = _.map(policies, (policy) => {
        const passwordLetters = _.split(policy.password, '');
        const has1 = passwordLetters[policy.pos1 - 1] === policy.letter;
        const has2 = passwordLetters[policy.pos2 - 1] === policy.letter;

        return (has1 || has2) && !(has1 && has2);
    });

    const testResults = _.countBy(test);

    console.log('testResults', testResults);
}

main();
