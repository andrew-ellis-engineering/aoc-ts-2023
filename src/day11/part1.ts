import { benchmark, parseInput } from '../util';
import { expandUniverse, indexGalaxies, manhattanDistance } from './common';

let universe = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 1

let sumDistances = 0;

benchmark(() => {
    universe = expandUniverse(universe);
    const galacticIndex = indexGalaxies(universe);
    for (let i = 0; i < galacticIndex.length - 1; i++) {
        for (let j = i+1; j < galacticIndex.length; j++) {
            sumDistances += manhattanDistance(galacticIndex[i], galacticIndex[j]);
        }
    }
})

export default sumDistances;