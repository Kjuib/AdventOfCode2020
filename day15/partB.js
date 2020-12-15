const _ = require('lodash');

const input = [20,9,11,0,1,2];
const iterations = 30_000_000;

function main() {
    const list = _.slice(input, 0, _.size(input) - 1);
    let current = _.last(input);

    const lastIndexList = {};
    _.forEach(list, (item, index) => {
        lastIndexList[item] = index;
    });

    for (let i = _.size(list); i < (iterations - 1); i++) {
        const lastIndex = lastIndexList[current];

        lastIndexList[current] = i;
        current = _.isNil(lastIndex) ? 0 : i - lastIndex;

        if (i % 100000 === 0) {
            console.log('Checking...', i, current, _.size(lastIndexList));
        }
    }
    console.log('current', current);
}

main();
