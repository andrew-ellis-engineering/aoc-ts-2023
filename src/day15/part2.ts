import { benchmark, parseInput } from '../util';
import { createMap, getBoxLabelLens, remove, replaceOrAdd } from './common';

const input = parseInput({split: {delimiter: ',', mapper: (l:string) => String(l)}});

// TODO: Complete Part 2

let sum = 0;

benchmark(() => {
    let map = createMap();
    for (let op of input) {
        const [box, label, lens] = getBoxLabelLens(op);
        if (lens === undefined) {
            map = remove(map, box, label);
        } else {
            map = replaceOrAdd(map, box, label, lens);
        }
    }
    for (let k of map.keys()) {
        let list = map.get(k) || [];
        let current = 0;
        for (let i = 0; i < list.length; i++) {
            const [label, lens] = list[i];
            current += (k+1) * (i+1) * lens;
        }
        sum += current;
    }
})

export default sum;
