const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function countTrees(input, slope) {
    const height = input.length;
    const width = input[0].length;
    const current = { x: 0, y: 0 };

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

    return treeCount;
}

function main() {
    const input = util.loadInput(filePath, { isGrid: true });
    util.printGrid(input);

    const slopes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];

    const treeCounts = _.map(slopes, (slope) => {
        return countTrees(input, slope);
    });

    console.log('treeCounts', treeCounts);

    const score = _.reduce(treeCounts, _.multiply);

    console.log('score', score);
}

main();
