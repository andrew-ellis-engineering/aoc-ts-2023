import { benchmark, parseInput } from '../util';

const input = parseInput({split: {delimiter: '\n', mapper: (l: string) => String(l)}});

// TODO: Complete Part 2

let totalCards = 0;

benchmark(() => {
    const cardMap = new Map<number, number>();

    for (let i = 0; i < input.length; i++) {
        cardMap.set(i+1, 1);
    }

    for (let line of input) {
        let split;
        split = line.split(':');
        let card = Number(split[0].match(/[0-9]+/));
        let nums = split[1];
        split = nums.split('|');
        let winners = split[0].split(' ').filter((x) => x !== '');
        let checkNums = split[1].split(' ').filter((x) => x !== '');
        let winnersCount = 0;
        let winnersSet = new Set(winners);
        for (let check of checkNums) {
            if (winnersSet.has(check)) {
                winnersCount++;
            }
        }
        for (let i = 0; i < winnersCount; i++) {
            let cardNum = card + i + 1;
            // @ts-ignore
            cardMap.set(cardNum, cardMap.get(cardNum) + cardMap.get(card));
        }
    }

    cardMap.forEach((value, key) => {
        totalCards += value;
    })

})

export default totalCards;