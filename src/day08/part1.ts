import { benchmark, parseInput } from '../util';
import { dataTransformer, goLeft, goRight } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const data = dataTransformer(input);

// TODO: Complete Part 1

let steps = 0;

benchmark(() => {
    const numDirections = data.directions.length;
    let currentState = 'AAA';

    while (currentState != 'ZZZ') {
        const dir = data.directions[steps % numDirections];
        if (dir == 'L') {
            currentState = goLeft(data.nodes[currentState]);
        } else {
            currentState = goRight(data.nodes[currentState]);
        }
        steps++;
    }
})

export default steps;
