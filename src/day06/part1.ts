import { benchmark, parseInput } from '../util';
import { binarySearchBottomEnd, mapInputToRaceRecords } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const records = mapInputToRaceRecords(input);

// TODO: Complete Part 1

let product = 1;

benchmark(() => {
    for (let r of records) {
        let bottom = binarySearchBottomEnd(r);
        let top = r.time - bottom;
        product *= top - bottom + 1;
    }
})

export default product;