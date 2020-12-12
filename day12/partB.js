const util = require('../util');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function main() {
    const input = util.loadInput(filePath);

    const commands = _.map(input, (row) => {
        const direction = _.head(row);
        const distance = _.parseInt(_.tail(row).join(''));

        return {
            direction,
            distance
        };
    });

    const current = {
        x: 0,
        y: 0
    };

    const currentWaypoint = {
        x: 10,
        y: 1
    };

    function doCommand(command) {
        switch (command.direction) {
            case 'N': {
                currentWaypoint.y += command.distance;
                break;
            }
            case 'E': {
                currentWaypoint.x += command.distance;
                break;
            }
            case 'S': {
                currentWaypoint.y -= command.distance;
                break;
            }
            case 'W': {
                currentWaypoint.x -= command.distance;
                break;
            }
            case 'F': {
                _.times(command.distance, () => {
                    current.x += currentWaypoint.x;
                    current.y += currentWaypoint.y;
                });
                break;
            }
            case 'R': {
                const rotateNumber = command.distance / 90;
                _.times(rotateNumber, () => {
                    const oldWaypoint = _.cloneDeep(currentWaypoint);
                    currentWaypoint.x = oldWaypoint.y;
                    currentWaypoint.y = -1 * oldWaypoint.x;
                });
                break;
            }
            case 'L': {
                const rotateNumber = command.distance / 90;
                _.times(rotateNumber, () => {
                    const oldWaypoint = _.cloneDeep(currentWaypoint);
                    currentWaypoint.x = -1 * oldWaypoint.y;
                    currentWaypoint.y = oldWaypoint.x;
                });
                break;
            }
        }
    }

    _.forEach(commands, doCommand);

    console.log('final', current);

    const score = Math.abs(current.x) + Math.abs(current.y);

    console.log('score', score);
}

main();
