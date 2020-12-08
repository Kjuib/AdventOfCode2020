const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);
    const commands = _.map(input, (str) => {
        const splitStr = _.split(str, ' ');
        return {
            command: splitStr[0],
            value: _.parseInt(splitStr[1])
        }
    });

    console.log('commands', commands);

    let currentCommand = null;
    let acc = 0;
    let currentIndex = 0;
    do {
        currentCommand = commands[currentIndex];
        console.log('currentCommand', currentCommand);

        if (currentCommand.hasRan) {
            console.log('acc', acc);
            currentCommand = null;
        } else if (currentCommand.command === 'nop') {
            currentCommand.hasRan = true;
            currentIndex++;
        } else if (currentCommand.command === 'acc') {
            currentCommand.hasRan = true;
            currentIndex++;
            acc += currentCommand.value
        } else if (currentCommand.command === 'jmp') {
            currentCommand.hasRan = true;
            currentIndex += currentCommand.value;
        } else {
            console.error('OOPS');
            currentCommand = null;
        }

    } while (currentCommand);
}

main();
