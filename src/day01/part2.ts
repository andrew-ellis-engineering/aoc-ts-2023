import { parseInput } from '../util';

const input = parseInput({split: {delimiter: '\n', mapper: (l: string) => String(l)}});

// TODO: Complete Part 2

let sum = 0;

const map = new Map<String, number>();
    map.set('1', 1);
    map.set('one', 1);
    map.set('eno', 1);
    map.set('2', 2);
    map.set('two', 2);
    map.set('owt', 2);
    map.set('3', 3);
    map.set('three', 3);
    map.set('eerht', 3);
    map.set('4', 4);
    map.set('four', 4);
    map.set('ruof', 4);
    map.set('5', 5);
    map.set('five', 5);
    map.set('evif', 5);
    map.set('6', 6);
    map.set('six', 6);
    map.set('xis', 6);
    map.set('7', 7);
    map.set('seven', 7);
    map.set('neves', 7);
    map.set('8', 8);
    map.set('eight', 8);
    map.set('thgie', 8);
    map.set('9', 9);
    map.set('nine', 9);
    map.set('enin', 9);

for (let line of input) {
    const first = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/);
    line = line.split('').reverse().join('');
    const second = line.match(/[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/);
    let digit1 = 0;
    let digit2 = 0;
    if (first) {
        let d = map.get(first[0]);
        if (d !== undefined) digit1 = d;
    }
    if (second) {
        let d = map.get(second[0]);
        if (d !== undefined) digit2 = d;
    }
    
    const lineCalibration = (digit1 * 10) + digit2;
    sum += lineCalibration;
}

console.log(sum);