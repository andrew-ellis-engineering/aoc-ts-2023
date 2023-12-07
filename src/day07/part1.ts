import { benchmark, parseInput } from '../util';
import { dataTransformer } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const hands = dataTransformer(input);

// TODO: Complete Part 1

let sum = 0;

benchmark(() => {
    hands.sort();
    for (let i = 0; i < hands.length(); i++) {
        const hand = hands.get(i);
        sum += hand.bid * (i + 1);
    }
})

export default sum;