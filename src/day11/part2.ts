import { benchmark, parseInput } from '../util';
import { expandUniverse, indexGalaxies, manhattanDistanceWithExpansionFactor } from './common';

let universe = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 2

let sumDistances = 0;

let expansionFactor = 1000000;

benchmark(() => {
    universe = expandUniverse(universe, true);
    const galacticIndex = indexGalaxies(universe);
    for (let i = 0; i < galacticIndex.length - 1; i++) {
        for (let j = i+1; j < galacticIndex.length; j++) {
            sumDistances += manhattanDistanceWithExpansionFactor(galacticIndex[i], galacticIndex[j], universe, expansionFactor);
        }
    }
})

export default sumDistances;