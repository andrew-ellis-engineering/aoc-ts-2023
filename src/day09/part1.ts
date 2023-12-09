import { benchmark, parseInput } from '../util';
import { mappingFunction, checkAllZeros, extrapolate } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});

// TODO: Complete Part 1

let sum = 0;

benchmark(() => {
    for (let line of input) {
        let solve = [line];
        let current = line;
        while (!checkAllZeros(current)) {
            let next = [];
            for (let i = 0; i < current.length - 1; i++) {
                next.push(current[i+1]-current[i]);
            }
            solve.push(next);
            current = next;
        }
        sum += extrapolate(solve);
    }
})

export default sum;
