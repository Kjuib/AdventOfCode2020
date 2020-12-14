const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTestB.txt';
const filePath = './input.txt';

function getAddressList(addressList) {
    if (_.includes(addressList[0], 'X')) {
        const newAddressList = _.reduce(addressList, (acc, address) => {
            acc.push(address.replace('X', '1'));
            acc.push(address.replace('X', '0'));

            return acc;
        }, []);
        return getAddressList(newAddressList);
    } else {
        return addressList;
    }
}

function main() {
    const input = util.loadInput(filePath);

    let currentMask = '';
    let data = {};
    _.forEach(input, (row) => {
        const [label, value] = row.split(' = ');
        if (label === 'mask') {
            currentMask = value.split('');
        } else {
            const addressInt = _.parseInt(/.*\[(\d*)]/.exec(label)[1]);
            const valueInt = _.parseInt(value);

            const address1 = _.padStart(addressInt.toString(2), 36, '0').split('');
            const address2 = _.map(currentMask, (maskChar, index) => {
                if (maskChar === '0') {
                    return address1[index];
                } else if (maskChar === '1') {
                    return '1';
                } else if (maskChar === 'X') {
                    return 'X';
                }
            });

            const addressList = getAddressList([address2.join('')])

            _.forEach(addressList, (addressSet) => {
                data[addressSet] = valueInt;
            });
        }
    });

    const total = _.reduce(data, (acc, value) => {
        return acc + value;
    }, 0);

    console.log('total', total);
}

main();
