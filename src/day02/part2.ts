import { parseInput } from '../util';
import { mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction }});

// TODO: Complete Part 2

let sumOfMinimumPowers = 0;

for (let lineInfo of input) {
    let redMax = 0, greenMax = 0, blueMax = 0;
    for (let draw of lineInfo.draws) {
        if (draw.red > redMax) {
            redMax = draw.red;
        }
        if (draw.green > greenMax) {
            greenMax = draw.green;
        }
        if (draw.blue > blueMax) {
            blueMax = draw.blue;
        }
    }
    sumOfMinimumPowers += redMax * greenMax * blueMax;
}

console.log(sumOfMinimumPowers)