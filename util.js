const fs = require('fs');
const _ = require('lodash');

function loadInput(filePath, options = {}) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n');
    const filteredInput = _.filter(listInput, _.negate(_.isEmpty));

    if (options.isIntegers) {
        return _.map(filteredInput, _.parseInt);
    } else {
        return filteredInput;
    }
}

module.exports = {
    loadInput
}
