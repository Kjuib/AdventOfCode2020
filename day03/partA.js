const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath, { isGrid: true });
    const height = input.length;
    const width = input[0].length;
    const current = { x: 0, y: 0 };
    const slope = { x: 3, y: 1 }

    util.printGrid(input);

    let treeCount = 0;
    while (current.y < height) {
        current.x += slope.x;
        current.y += slope.y;

        if (current.x >= width) {
            current.x -= width;
        }

        if (_.get(input, `[${current.y}][${current.x}]`) === '#') {
            treeCount++;
        }
    }

    console.log('treeCount', treeCount);
}

main();
