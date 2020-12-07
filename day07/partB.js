const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTestB.txt';
const filePath = './input.txt';

function countContaining(data, bagName, parentCount) {
    const children = data[bagName];

    return _.reduce(children, (acc, childCount, childName) => {
        acc = acc + (parentCount * (childCount + countContaining(data, childName, childCount)));

        return acc;
    }, 0);
}

function main() {
    const input = util.loadInput(filePath);

    const data = _.reduce(input, (acc, row) => {
        const [ parent, childrenStr ] = row.split(' bags contain ');

        const childrenList = childrenStr.split(', ');
        const children = _.reduce(childrenList, (acc, child) => {
            const match = /(\d )?(.*?) bag/.exec(child);
            const childName = match[2];

            if (childName !== 'no other') {
                acc[childName] = _.parseInt(match[1]);
            }

            return acc;
        }, {});

        acc[parent] = children;

        return acc;
    }, {});

    const count = countContaining(data, 'shiny gold', 1);

    console.log('count', count);
}

main();
