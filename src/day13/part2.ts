import { benchmark, parseInput } from '../util';
import { dataTransformer, findMirrorIndexHorizontal, findMirrorIndexVertical, logGrid } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const data = dataTransformer(input);
// TODO: Complete Part 2

let result = 0;

benchmark(() => {
    for (let p of data) {
        let index;
        index = findMirrorIndexHorizontal(p.grid, true) + 1;
        if (index === p.grid.length) {
            index = findMirrorIndexVertical(p.grid, true) + 1;
        } else {
            index *= 100;
        }
        result += index;
    }
})

export default result;
