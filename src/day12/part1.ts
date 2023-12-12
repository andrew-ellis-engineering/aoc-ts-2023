import { benchmark, parseInput } from '../util';
import { countCombinationsForRow, dataTransformer } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const springs = dataTransformer(input);

// TODO: Complete Part 1

let sum = 0;

benchmark(() => {
    for (let i = 0; i < springs.length; i++) {
        const spring = springs[i];
        sum += countCombinationsForRow(spring);
    }
})

export default sum;
