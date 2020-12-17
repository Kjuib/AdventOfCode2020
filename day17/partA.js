const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function getKey(...points) {
    return points.join(',');
}

function reCenter(smallGrid) {
    const diff = _.floor(_.size(smallGrid) / 2);
    const newMap = new Map();

    _.forEach(smallGrid, (row, y) => {
        _.forEach(row, (value, x) => {
            newMap.set(getKey(x - diff, y - diff, 0), value);
        });
    });

    return newMap;
}

function countOthers(x, y, z, grid) {
    const others = [];

    for (let z1 = -1; z1 <= 1; z1++) {
        for (let y1 = -1; y1 <= 1; y1++) {
            for (let x1 = -1; x1 <= 1; x1++) {
                if (z1 === 0 && y1 === 0 && x1 === 0) {
                    continue; // skip home
                }
                others.push(grid.get(getKey(x + x1, y + y1, z + z1)) || '.');
            }
        }
    }
    return _.countBy(others)['#'] || 0;
}

function generate(grid) {
    const newGrid = new Map();

    for (let z = -10; z <= 10; z++) {
        for (let y = -10; y <= 10; y++) {
            for (let x = -10; x <= 10; x++) {
                const key = getKey(x, y, z);
                const value = grid.get(key) || '.';
                const others = countOthers(x, y, z, grid);

                if (value === '#' && (others === 2 || others === 3)) {
                    newGrid.set(key, '#');
                } else if (value === '.' && others === 3) {
                    newGrid.set(key, '#');
                } else {
                    newGrid.set(key, '.');
                }
            }
        }
    }

    return newGrid;
}

function count(grid) {
    let count = 0;
    grid.forEach((value) => {
        if (value === '#') {
            count++;
        }
    });
    return count;
}

function main() {
    const input = util.loadInput(filePath, { isGrid: true });
    let grid = reCenter(input);

    _.times(6, () => {
        grid = generate(grid);
        console.log('COUNT:', count(grid));
    });
}

main();
