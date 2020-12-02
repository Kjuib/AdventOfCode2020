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
            min: _.parseInt(regexResults[1]),
            max: _.parseInt(regexResults[2])
        };
    });

    const test = _.map(policies, (policy) => {
        const count = _.countBy(_.split(policy.password, ''));
        return count[policy.letter] >= policy.min && count[policy.letter] <= policy.max;
    });

    const testResults = _.countBy(test);

    console.log('testResults', testResults);
}

main();
