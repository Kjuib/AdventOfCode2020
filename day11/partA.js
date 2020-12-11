const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function updateChair(x, y, roomState) {
    const chair = roomState[y][x];

    const others = [];
    others.push(_.get(roomState, `[${y-1}][${x-1}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y-1}][${x}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y-1}][${x+1}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y}][${x-1}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y}][${x+1}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y+1}][${x-1}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y+1}][${x}]`) === '#' ? 1 : 0);
    others.push(_.get(roomState, `[${y+1}][${x+1}]`) === '#' ? 1 : 0);

    if (chair === 'L' && _.sum(others) === 0) {
        return '#';
    } else if (chair === '#' && _.sum(others) >= 4) {
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
