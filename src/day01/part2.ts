import { parseInput } from '../util';

const input = parseInput({split: {delimiter: '\n', mapper: (l: string) => String(l)}});

// TODO: Complete Part 2

let sum = 0;

const map = new Map<String, number>([
    ['1', 1],
    ['one', 1],
    ['eno', 1],
    ['2', 2],
    ['two', 2],
    ['owt', 2],
    ['3', 3],
    ['three', 3],
    ['eerht', 3],
    ['4', 4],
    ['four', 4],
    ['ruof', 4],
    ['5', 5],
    ['five', 5],
    ['evif', 5],
    ['6', 6],
    ['six', 6],
    ['xis', 6],
    ['7', 7],
    ['seven', 7],
    ['neves', 7],
    ['8', 8],
    ['eight', 8],
    ['thgie', 8],
    ['9', 9],
    ['nine', 9],
    ['enin', 9],
]);


for (let line of input) {
    const first = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/);
    line = line.split('').reverse().join('');
    const second = line.match(/[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/);
    let digit1 = 0;
    let digit2 = 0;
    if (first) {
        // @ts-ignore
        digit1 = map.get(first[0]);
    }
    if (second) {
        // @ts-ignore
        digit2 = map.get(second[0]);
    }
    
    const lineCalibration = (digit1 * 10) + digit2;
    sum += lineCalibration;
}

export default sum;