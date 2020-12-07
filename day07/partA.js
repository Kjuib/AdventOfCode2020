const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function containingBag(data, bagName) {
    return _.reduce(data, (acc, bagDetails) => {
        if (_.includes(bagDetails.children, bagName)) {
            acc = [ ...acc, bagDetails.name, ...containingBag(data, bagDetails.name) ];
        }

        return acc;
    }, []);
}

function main() {
    const input = util.loadInput(filePath);

    const data = _.map(input, (row) => {
        const [ parent, childrenStr ] = row.split(' bags contain ');

        const children = childrenStr
            .split(', ')
            .map((str) => {
                return /(?:\d )?(.*?) bag/.exec(str)[1];
            })
        ;

        return {
            name: parent,
            children: children
        };
    });

    const bagList = containingBag(data, 'shiny gold');
    const uniqueBagList = _.uniq(bagList);

    console.log('count', uniqueBagList.length);
}

main();
