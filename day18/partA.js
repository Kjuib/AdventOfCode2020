const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function calculate(command) {
    if (_.includes(command, '(')) {
        const openIndex = _.lastIndexOf(command, '(');
        const closeIndex = _.indexOf(command, ')', openIndex);
        const subCommand = _.slice(command, openIndex + 1, closeIndex).join('');
        const subTotal = calculate(subCommand);
        command = _.replace(command, `(${subCommand})`, subTotal);
    } else {
        const match = /^(\d+)\s([+*])\s(\d+)/.exec(command);
        const num1 = _.parseInt(match[1]);
        const num2 = _.parseInt(match[3]);
        if (match[2] === '+') {
            command = _.replace(command, match[0], (num1 + num2));
        } else if (match[2] === '*') {
            command = _.replace(command, match[0], (num1 * num2));
        } else {
            console.error('OOPS', command, match);
        }
    }

    if (_.includes(command, '+') || _.includes(command, '*')) {
        return calculate(command);
    } else {
        return _.parseInt(command);
    }
}

function main() {
    const input = util.loadInput(filePath);

    const total = _.reduce(input, (acc, command) => {
        const result = calculate(command);
        console.log(command, result);
        return acc += result;
    }, 0);

    console.log('total', total);
}

main();
