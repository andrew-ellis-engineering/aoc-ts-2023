import { benchmark, parseInput } from '../util';
import { binarySearchBottomEnd, mapInputToSingleRaceRecord } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const record = mapInputToSingleRaceRecord(input);

// TODO: Complete Part 2

let result = 1;

benchmark(() => {
    let bottom = binarySearchBottomEnd(record);
    let top = record.time - bottom;
    result = top - bottom + 1;
})

export default result;
