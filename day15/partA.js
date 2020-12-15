const _ = require('lodash');

// const input = [0,3,6];
const input = [20,9,11,0,1,2];
const iterations = 2020;

function main() {
    const list = _.slice(input, 0, _.size(input) - 1);
    let current = _.last(input);

    for (let i = 0; i < (iterations - _.size(input)); i++) {
        const lastIndex = _.lastIndexOf(list, current);

        if (lastIndex === -1) {
            list.push(current);
            current = 0;
        } else {
            list.push(current);
            current = _.size(list) - lastIndex - 1;
        }
    }

    list.push(current);

    console.log('LIST', JSON.stringify(list));
    console.log('\n');
    console.log('LAST', _.last(list));
}

main();
