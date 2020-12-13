const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);
    const currentTime = _.parseInt(input[0])
    const busList = _.reduce(_.split(input[1], ','), (acc, str) => {
        if (str !== 'x') {
            acc.push(_.parseInt(str));
        }

        return acc;
    }, []);

    const busMap = _.map(busList, (busNum) => {
        return {
            busNum: busNum,
            depart: busNum - (currentTime % busNum)
        };
    });

    const bestBus = _.minBy(busMap, 'depart');

    console.log('bestBus', bestBus);

    console.log('ID', bestBus.busNum * bestBus.depart);

}

main();
