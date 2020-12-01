const util = require('../util');

const filePath = './inputA.txt';

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    for (let i = 0; i < input.length - 1; i++) {
        const item1 = input[i];
        for (let j = i + 1; j < input.length; j++) {
            const item2 = input[j];

            if (item1 + item2 === 2020) {
                console.log('item1', item1);
                console.log('item2', item2);
                console.log('RESULT', item1 * item2);
            }
        }

    }
}

main();
