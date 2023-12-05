import { benchmark, parseInput } from '../util';
import { dataTransformer, mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});
const data = dataTransformer(input, true);

// TODO: Complete Part 2

let lowestLocation = Number.MAX_SAFE_INTEGER;

benchmark(() => {
    let seedRanges = data.seedRanges;
    let mappings = data.mappings;

    for (let map of mappings) {
        for (let i = 0; i < seedRanges.length; i++) {
            let s = map.mapRange(seedRanges[i]);
            seedRanges = [
                ...seedRanges.slice(0, i),
                ...s,
                ...seedRanges.slice(i+1)
            ];
            i = i + s.length - 1;
        }
    }

    for (let r of seedRanges) {
        if (r.start !== 0 && r.start < lowestLocation) {
            lowestLocation = r.start;
        }
    }
});

export default lowestLocation;