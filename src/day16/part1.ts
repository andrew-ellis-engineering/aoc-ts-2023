import { benchmark, parseInput } from '../util';
import { countEnergized, mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});

// TODO: Complete Part 1

let energized = 0;

benchmark(() => {
    energized = countEnergized(input);
})

export default energized;
