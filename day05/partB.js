const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);

    const idList = _.map(input, (pass) => {
        const parsed = /(.{7})(.{3})/.exec(pass);
        const row = parseInt(parsed[1].replace(/F/g, '0').replace(/B/g, '1'), 2);
        const col = parseInt(parsed[2].replace(/L/g, '0').replace(/R/g, '1'), 2);
        const id = (row * 8) + col;

        return id;
    });

    const orderList = _.orderBy(idList);

    _.forEach(orderList, (id, index) => {
        if (id !== orderList[index + 1] - 1) {
            console.log('MISSING', id, orderList[index + 1]);
        }
    })
}

main();
