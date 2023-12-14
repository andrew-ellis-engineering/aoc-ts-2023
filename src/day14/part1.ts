import { benchmark, parseInput } from '../util';
import { rollAll, scoreGrid } from './common';

let input = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 1

let sum = 0;

benchmark(() => {
    input = rollAll(input);
    sum = scoreGrid(input);
})

export default sum;
