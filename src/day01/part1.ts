import { parseInput } from '../util';

const input = parseInput({split: {delimiter: '\n', mapper: (l: string) => String(l)}});

// TODO: Complete Part 1

let sum = 0;

for (let line of input) {
    const first = line.match(/[0-9]/);
    line = line.split('').reverse().join('');
    const second = line.match(/[0-9]/);
    const lineCalibration = Number(first ? first[0] : 0) * 10 + Number(second ? second[0] : 0)
    sum += lineCalibration;
}

console.log(sum);