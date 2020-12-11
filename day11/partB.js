const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
// const filePath = './inputTestB.txt';
const filePath = './input.txt';

function checkChair(roomState, x, y, xDir, yDir, distance) {
    const chair = _.get(roomState, `[${y + (yDir * distance)}][${x + (xDir * distance)}]`);
    if (chair === '#') {
        return 1;
    } else if (chair === 'L') {
        return 0;
    } else if (chair === '.') {
        return checkChair(roomState, x, y, xDir, yDir, distance + 1);
    } else {
        // Off the grid
        return 0;
    }
}

function updateChair(x, y, roomState) {
    const chair = roomState[y][x];

    const others = [];
    others.push(checkChair(roomState, x, y, -1, -1, 1));
    others.push(checkChair(roomState, x, y, -1, 0, 1));
    others.push(checkChair(roomState, x, y, -1, 1, 1));

    others.push(checkChair(roomState, x, y, 0, -1, 1));
    others.push(checkChair(roomState, x, y, 0, 1, 1));

    others.push(checkChair(roomState, x, y, 1, -1, 1));
    others.push(checkChair(roomState, x, y, 1, 0, 1));
    others.push(checkChair(roomState, x, y, 1, 1, 1));

    if (chair === 'L' && _.sum(others) === 0) {
        return '#';
    } else if (chair === '#' && _.sum(others) >= 5) {
        return 'L';
    } else {
        return chair;
    }
}

function scanRoom(oldRoomState) {
    const newRoomState = _.cloneDeep(oldRoomState);

    for (let y = 0; y < oldRoomState.length; y++) {
        const width = oldRoomState[0].length;
        for (let x = 0; x < width; x++) {
            newRoomState[y][x] = updateChair(x, y, oldRoomState);
        }
    }

    return newRoomState;
}

function countOccupied(roomState) {
    return _.countBy(_.flattenDeep(roomState))['#'];
}

function main() {
    const input = util.loadInput(filePath, { isGrid: true });
    let roomState = _.cloneDeep(input);
    let oldRoomState;
    do {
        oldRoomState = roomState;
        roomState = scanRoom(roomState);
    } while (!_.isEqual(oldRoomState, roomState));

    util.printGrid(roomState);
    console.log('');
    const occupiedSeats = countOccupied(roomState);
    console.log('occupiedSeats', occupiedSeats);
}

main();
