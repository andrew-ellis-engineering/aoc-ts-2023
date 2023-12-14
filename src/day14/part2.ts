import { benchmark, parseInput } from '../util';
import { gridToString, spinCycle } from './common';

let input = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 2

let sum = 0;

benchmark(() => {
    let beforeLoop = true;
    let score = 0, grid = input;
    let loop = [gridToString(grid)];
    for (let i = 0; i <= 1000000000; i++) {
        [score, grid] = spinCycle(grid);
        const str = gridToString(grid);
        if (beforeLoop && loop.includes(str)) {
            const start = loop.indexOf(str);
            i = start;
            const remainingIterations = 1000000000 - start;
            const loopLength = loop.length - start;
            const loopCount = Math.floor(remainingIterations / loopLength);
            i += loopCount * loopLength;
            beforeLoop = false;
        } else {
            loop.push(str);
        }
    }
    sum = score;
})

export default sum;
