const _ = require('lodash');

const input = [0,3,6];
const iterations = 30_000_000;

function main() {
    const list = _.slice(input, 0, _.size(input) - 1);
    let current = _.last(input);

    const lastIndexList = new Map();
    _.forEach(list, (item, index) => {
        lastIndexList.set(item, index);
    });

    for (let i = _.size(list); i < (iterations - 1); i++) {
        const lastIndex = lastIndexList.get(current);

        lastIndexList.set(current, i);
        current = _.isNil(lastIndex) ? 0 : i - lastIndex;

        if (i % 100000 === 0) {
            console.log('Checking...', i, current);
        }
    }
    console.log('current', current);
}

main();
