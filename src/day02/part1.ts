import { parseInput } from '../util';
import { mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction }});

// TODO: Complete Part 1

let sumOfIds = 0;

for (let lineInfo of input) {
    let possible = true;
    for (let draw of lineInfo.draws) {
        if (draw.red > 12 || draw.green > 13 || draw.blue > 14) {
            possible = false;
            break;
        }
    }
    if (possible) {
        sumOfIds += lineInfo.id;
    }
}

export default sumOfIds;