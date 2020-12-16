const fs = require('fs');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath, 'utf8');
    const match = /^(.*)\n\nyour\sticket:\n(.*)\n\nnearby tickets:\n(.*)\n$/s.exec(fileInput);

    const results = {};
    results.data = match[1];
    results.ticket = match[2];
    results.others = match[3];

    results.data = _.reduce(_.split(results.data, '\n'), (acc, dataPoint) => {
        const dataMatch = /^(.*):\s(\d*)-(\d*)\sor\s(\d*)-(\d*)$/.exec(dataPoint);

        acc[dataMatch[1]] = {
            num1a: _.parseInt(dataMatch[2]),
            num1b: _.parseInt(dataMatch[3]),
            num2a: _.parseInt(dataMatch[4]),
            num2b: _.parseInt(dataMatch[5])
        }

        return acc;
    }, {});
    results.ticket = _.map(_.split(results.ticket, ','), _.parseInt);
    results.others = _.map(_.split(results.others, '\n'), (other) => {
        return _.map(_.split(other, ','), _.parseInt);
    });

    return results;
}

function main() {
    const ticketData = loadInput(filePath);

    console.log('ticketData', ticketData);

    const invalidValues = [];
    _.forEach(_.flatten(ticketData.others), (ticketValue) => {
        const validMap = _.map(ticketData.data, (dataCheck) => {
            return (
                (ticketValue >= dataCheck.num1a && ticketValue <= dataCheck.num1b) ||
                (ticketValue >= dataCheck.num2a && ticketValue <= dataCheck.num2b)
            )
        });

        if (!_.some(validMap)) {
            invalidValues.push(ticketValue);
        }
    });

    console.log('invalidValues', invalidValues);

    console.log('Error Rate:', _.sum(invalidValues));

}

main();
