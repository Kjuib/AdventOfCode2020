const fs = require('fs');
const _ = require('lodash');

// const filePath = './inputTest.txt';
const filePath = './input.txt';

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath, 'utf8');
    const [ ruleListStr, messageStr ] = fileInput.split('\n\n');

    const rules = _.reduce(ruleListStr.split('\n'), (acc, ruleStr) => {
        const [ label, restRule ] = ruleStr.split(':');

        if (_.includes(restRule, '"')) {
            const match = /"(.*)"/.exec(restRule);
            acc[label] = {
                char: match[1]
            };
        } else if (_.includes(restRule, '|')) {
            const [ rule1, rule2 ] = restRule.split('|');

            acc[label] = {
                rule1: _.filter(rule1.split(' '), _.negate(_.isEmpty)),
                rule2: _.filter(rule2.split(' '), _.negate(_.isEmpty))
            };
        } else {
            acc[label] = {
                rule1: _.filter(restRule.split(' '), _.negate(_.isEmpty))
            };
        }

        return acc;
    }, {});
    const messages = _.filter(messageStr.split('\n'), _.negate(_.isEmpty));

    return {
        rules,
        messages
    };
}

function buildRegex(regex, ruleKey, ruleList) {
    const currentRule = ruleList[ruleKey];

    if (currentRule.char) {
        return regex + currentRule.char;
    } else if (currentRule.rule2) {
        const rule1Str = _.reduce(currentRule.rule1, (acc, ruleKey) => {
            return acc + buildRegex('', ruleKey, ruleList);
        }, '');
        const rule2Str = _.reduce(currentRule.rule2, (acc, ruleKey) => {
            return acc + buildRegex('', ruleKey, ruleList);
        }, '');

        return `${regex}((${rule1Str})|(${rule2Str}))`;
    } else {
        const rule1Str = _.reduce(currentRule.rule1, (acc, ruleKey) => {
            return acc + buildRegex('', ruleKey, ruleList);
        }, '');

        return `${regex}(${rule1Str})`;
    }
}

function main() {
    const data = loadInput(filePath);

    const regex = '^' + buildRegex('', '0', data.rules) + '$'

    const count = _.reduce(data.messages, (acc, message) => {
        if (new RegExp(regex).test(message)) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    console.log('count', count);
}

main();
