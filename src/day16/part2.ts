import { benchmark, parseInput } from '../util';
import { Direction, countEnergized, mappingFunction } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});

// TODO: Complete Part 2

let maxEnergized = 0;

benchmark(() => {
    let startingPositions: ([[number, number], Direction])[] = [];
    const height = input.length;
    const width = input[0].length;
    for (let i = 0; i < height; i++) {
        startingPositions.push([[i, 0], Direction.RIGHT]);
        startingPositions.push([[i, width-1], Direction.LEFT]);
    }
    for (let i = 0; i < width; i++) {
        startingPositions.push([[0, i], Direction.DOWN]);
        startingPositions.push([[height-1, i], Direction.UP]);
    }
    for (let start of startingPositions) {
        const energized = countEnergized(input, start);
        if (maxEnergized < energized) maxEnergized = energized;
    }
})

export default maxEnergized;
