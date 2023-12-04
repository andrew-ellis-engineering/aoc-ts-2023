import { parseInput } from '../util';

const input = parseInput({split: {delimiter: '\n', mapper: (l: string) => String(l)}});

// TODO: Complete Part 1

let totalScore = 0;

for (let line of input) {
    let split;
    split = line.split(':');
    let card = split[0];
    let nums = split[1];
    split = nums.split('|');
    let winners = split[0].split(' ').filter((x) => x !== '');
    let checkNums = split[1].split(' ').filter((x) => x !== '');
    let thisCardScore = 0;
    let winnersSet = new Set(winners);
    for (let check of checkNums) {
        if (winnersSet.has(check)) {
            if (thisCardScore === 0) {
                thisCardScore = 1;
            } else {
                thisCardScore *= 2;
            }
        }
    }
    totalScore += thisCardScore;
}

export default totalScore;