const util = require('../util');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath, { isIntegers: true });

    for (let i = 0; i < input.length - 2; i++) {
        const item1 = input[i];
        for (let j = i + 1; j < input.length - 1; j++) {
            const item2 = input[j];
            for (let k = j + 1; k < input.length; k++) {
                const item3 = input[k];

                if (item1 + item2 + item3 === 2020) {
                    console.log('item1', item1);
                    console.log('item2', item2);
                    console.log('item3', item3);
                    console.log('RESULT', item1 * item2 * item3);
                }
            }
        }
    }
}

main();
