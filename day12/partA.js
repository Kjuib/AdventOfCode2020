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
        y: 0,
        d: 'E'
    };

    const compass = ['N', 'E', 'S', 'W'];

    function doCommand(command) {
        switch (command.direction) {
            case 'N': {
                current.y += command.distance;
                break;
            }
            case 'E': {
                current.x += command.distance;
                break;
            }
            case 'S': {
                current.y -= command.distance;
                break;
            }
            case 'W': {
                current.x -= command.distance;
                break;
            }
            case 'F': {
                doCommand({
                    direction: current.d,
                    distance: command.distance
                });
                break;
            }
            case 'R': {
                const currentIndex = _.indexOf(compass, current.d);
                let newIndex = currentIndex + (command.distance / 90);
                newIndex = newIndex >= compass.length ? newIndex - compass.length : newIndex;
                current.d = compass[newIndex];
                break;
            }
            case 'L': {
                const currentIndex = _.indexOf(compass, current.d);
                let newIndex = currentIndex - (command.distance / 90);
                newIndex = newIndex < 0 ? newIndex + compass.length : newIndex;
                current.d = compass[newIndex];
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
