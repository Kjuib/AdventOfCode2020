const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);

    let currentMask = {};
    let data = {};
    _.forEach(input, (row) => {
        const [label, value] = row.split(' = ');
        if (label === 'mask') {
            currentMask = _.reduce(value.split(''), (acc, current, index) => {
                if (current !== 'X') {
                    acc[`[${index}]`] = current;
                }
                return acc;
            }, {});
        } else {
            const valueBinary = _.parseInt(value).toString(2);

            const valueList = _.padStart(valueBinary, 36, '0').split('');
            _.forEach(currentMask, (maskValue, maskKey) => {
                _.set(valueList, maskKey, maskValue);
            });

            _.set(data, label, valueList.join(''));
        }
    });

    const total = _.reduce(data.mem, (acc, row) => {
        if (row) {
            const intValue = _.parseInt(row, 2);
            acc += intValue;
        }

        return acc;
    }, 0);

    console.log('total', total);
}

main();
