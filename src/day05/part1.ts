import { benchmark, parseInput } from '../util';
import { dataTransformer, mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});
const data = dataTransformer(input);

// TODO: Complete Part 1

let lowestLocation = Number.MAX_SAFE_INTEGER;

benchmark(() => {
    let seeds = data.seeds
    let mappings = data.mappings;

    for (let map of mappings) {
        for (let i = 0; i < seeds.length; i++) {
            let s = map.map(seeds[i]);
            seeds[i] = s;
        }
    }

    for (let l of seeds) {
        if (l < lowestLocation) {
            lowestLocation = l;
        }
    }
});

export default lowestLocation;