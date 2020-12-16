const fs = require('fs');
const _ = require('lodash');

// const filePath = './inputTest.txt';
// const filePath = './inputTestB.txt';
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

        acc.push({
            label: dataMatch[1],
            num1a: _.parseInt(dataMatch[2]),
            num1b: _.parseInt(dataMatch[3]),
            num2a: _.parseInt(dataMatch[4]),
            num2b: _.parseInt(dataMatch[5])
        })

        return acc;
    }, []);
    results.ticket = _.map(_.split(results.ticket, ','), _.parseInt);
    results.others = _.map(_.split(results.others, '\n'), (other) => {
        return _.map(_.split(other, ','), _.parseInt);
    });

    return results;
}

function isValid(dataPoints, ticketValue) {
    return (
        (ticketValue >= dataPoints.num1a && ticketValue <= dataPoints.num1b) ||
        (ticketValue >= dataPoints.num2a && ticketValue <= dataPoints.num2b)
    );
}

function getValidTickets(ticketData) {
    return _.reduce(ticketData.others, (acc, ticketValueList) => {
        const validMap1 = _.map(ticketValueList, (ticketValue) => {
            const validMap2 = _.map(ticketData.data, (dataPoints) => {
                return isValid(dataPoints, ticketValue);
            });

            return _.some(validMap2);
        });

        if (_.every(validMap1)) {
            acc.push(ticketValueList);
        }

        return acc;
    }, []);
}

function main() {
    const ticketData = loadInput(filePath);

    const validTickets = getValidTickets(ticketData);

    const indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

    let labelMap = {};
    _.forEach(ticketData.data, (dataPoints) => {
        let found = false;
        _.forEach(indexes, (index) => {
            if (_.has(labelMap, index) || found) {
                return;
            }

            const ticketScan = _.map(validTickets, (ticket) => {
                return isValid(dataPoints, ticket[index]);
            });

            if (_.every(ticketScan)) {
                if (labelMap[index]) {
                    labelMap[index].push(dataPoints.label)
                } else {
                    labelMap[index] = [dataPoints.label];
                }
                found = true;
            }
        });
        if (!found) {
            console.log('MISSING', dataPoints.label);
        }
    });
    console.log('labelMap', labelMap);
    console.log('SIZE:', _.size(labelMap));
    console.log('checks:', _.orderBy(labelMap, (data) => {
        return _.size(data);
    }).map((data, key) => {
        return key + ':' + data;
    }));

    const score = _.reduce(ticketData.ticket, (acc, ticketValue, index) => {
        const label = labelMap[index];

        if (_.startsWith(label, 'departure')) {
            return acc * ticketValue;
        } else {
            return acc;
        }
    }, 1);

    console.log('score', score);
}

main();

// 592226730547 too low
