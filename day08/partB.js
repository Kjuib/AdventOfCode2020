const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function run(commands) {
    let currentCommand = null;
    let acc = 0;
    let currentIndex = 0;
    let looping = false;
    do {
        currentCommand = commands[currentIndex];

        if (currentCommand.hasRan) {
            looping = true;
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

        currentCommand = commands[currentIndex];
    } while (currentCommand && !looping);

    if (!looping) {
        console.log('acc', acc);
    }

    return looping
}

function main() {
    const input = util.loadInput(filePath);
    const commands = _.map(input, (str) => {
        const splitStr = _.split(str, ' ');
        return {
            command: splitStr[0],
            value: _.parseInt(splitStr[1])
        }
    });

    for (let i = 0; i < commands.length; i++) {
        const commandClone = _.cloneDeep(commands);
        const changeCommand = commandClone[i];
        if (changeCommand.command === 'nop') {
            changeCommand.command = 'jmp';
        } else if (changeCommand.command === 'jmp') {
            changeCommand.command = 'nop';
        }

        run(commandClone);
    }
}

main();
