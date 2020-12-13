const _ = require('lodash');

function testBuses(busList, currentTime) {
    const modList = _.map(busList, (bus, index) => {
        if (bus === 'x') {
            return true;
        } else {
            const target = (index === 0 ? 0 : bus - index);
            return (currentTime % bus) === target;
        }
    });
    
    if (_.every(modList)) {
        console.log('FOUND', currentTime);
        return true;
    } else {
        return false;
    }
}

function main() {
    const x = 'x';
    const busList = [17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,23,x,x,x,x,x,x,x,787,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29];

    // const busList = [17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13];
    // const busList = [17,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523]; // 471206  // 3387454
    // const busList = [17,x,x,x,x,x,x,41]; // 34  // 731

    // const busList = [1789,37,47,1889];

    const busList2 = _.reduce(busList, (acc, bus, index) => {
        if (bus !== 'x') {
            acc.push({
                id: bus,
                offset: index
            });
        }
        return acc;
    }, []);

    console.log('busList2', busList2);

    const final = _.reduce(_.tail(busList2), (acc, bus) => {
        console.log('acc', acc);
        console.log('bus', bus);

        let timestamp = acc.start + acc.coprime;
        console.log('timestamp', timestamp);

        acc.buses.push(bus);

        let found = false
        while(!found){
            const map1 = _.map(acc.buses, (bus1) => {
                return (timestamp + bus1.offset + acc.coprime) % bus1.id === 0;
            });
            console.log('map1', map1);

            found = _.every(map1);

            timestamp += acc.coprime
        }

        console.log('timestamp', timestamp);

        return {
            start: timestamp,
            coprime: acc.coprime * bus.id,
            buses: acc.buses
        };
    }, {
        start: busList2[0].id,
        coprime:busList2[0].id,
        buses:[busList2[0]]
    });

    console.log('timestamp', final);
}

//18467090656058800
// 47_826_242_800_000


//     130_609_500_000
//     312_721_300_000
// 100_000_000_000_000

main();
