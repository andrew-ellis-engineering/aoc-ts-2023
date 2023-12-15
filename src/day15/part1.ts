import { benchmark, parseInput } from '../util';
import { mapToAsciiArr } from './common';

const input = parseInput({split: {delimiter: ',', mapper: mapToAsciiArr}});

// TODO: Complete Part 1

let sum = 0;

benchmark(() => {
    for (let ascii of input) {
        let current = 0;
        for (let n of ascii) {
            current += n;
            current = (current * 17) % 256;
        }
        sum += current;
    }
})

export default sum;
