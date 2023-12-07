const cardValues: {[index: string]: any} = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
}

const cardValuesPart2: {[index: string]: any} = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
    'J': 0
}

const enum HandType {
    FIVE = 7,
    FOUR = 6,
    FULL = 5,
    THREE = 4,
    TWO = 3,
    ONE = 2,
    HIGH = 1
}

interface Hand {
    cards: string[],
    bid: number,
    type: HandType
}

class Hands {
    hands: Hand[];

    constructor() {
        this.hands = [];
    }

    add(h: Hand) {
        this.hands = [...this.hands, h];
    }

    sort(part2 = false) {
        this.hands.sort((a,b) => {
            if (a.type !== b.type) {
                return a.type - b.type;
            }
            if (part2) {
                for (let i = 0; i < a.cards.length; i++) {
                    if (cardValuesPart2[a.cards[i]] !== cardValuesPart2[b.cards[i]]) {
                        return cardValuesPart2[a.cards[i]] - cardValuesPart2[b.cards[i]];
                    }
                }
            } else {
                for (let i = 0; i < a.cards.length; i++) {
                    if (cardValues[a.cards[i]] !== cardValues[b.cards[i]]) {
                        return cardValues[a.cards[i]] - cardValues[b.cards[i]];
                    }
                }
            }

            return a.type - b.type;
        });
    }

    length() {
        return this.hands.length;
    }

    get(i: number) {
        return this.hands[i];
    }
}

export const dataTransformer = (input: string[], part2 = false) => {
    let hands = new Hands();
    for (let line of input) {
        const handAndBid = line.split(' ');
        const h = handAndBid[0];
        const b = handAndBid[1];
        const t = getHandType(h, part2);
        const handToAdd = { cards: h.split(''), bid: Number(b), type: t };
        hands.add(handToAdd);
    }
    return hands;
}

const getHandType = (hand: string, part2 = false): HandType => {
    const cards = hand.split('');
    let counter: {[index: string]: any} = {};
    if (part2) {
        cards.sort(compareCards);
    }
    for (let c of cards) {
        if (counter[c] === undefined) {
            counter[c] = 0;
        }
        counter[c] = counter[c] + 1;
    }

    if (part2) {
        let jCount = 0;
        if (counter['J'] !== undefined) {
            if (counter['J'] !== 5) {
                jCount = counter['J'];
                counter['J'] = 0;
            }
        }

        if (jCount > 0) {
            let cardMax = 0, cardMaxIndex = '';
            for (let c of cards) {
                if (counter[c] > cardMax) {
                    cardMax = counter[c];
                    cardMaxIndex = c;
                }
            }

            if (cardMax > 1) {
                counter[cardMaxIndex] = counter[cardMaxIndex] + jCount;
            } else {
                counter[cards[0]] = counter[cards[0]] + jCount;
            }
        }
    }

    let hasThree = false;
    let hasTwo = false;
    let hasTwoPair = false;
    for (let c in counter) {
        if (counter[c] === 5) {
            return HandType.FIVE;
        }
        if (counter[c] === 4) {
            return HandType.FOUR;
        }
        if (counter[c] === 3) {
            hasThree = true;
        }
        if (counter[c] === 2) {
            if (hasTwo) hasTwoPair = true;
            hasTwo = true;
        }
    }

    if (hasThree && hasTwo) {
        return HandType.FULL;
    }

    if (hasThree) {
        return HandType.THREE;
    }

    if (hasTwoPair) {
        return HandType.TWO;
    }

    if (hasTwo) {
        return HandType.ONE;
    }

    return HandType.HIGH;
}

const compareCards = (a: string, b: string) => {
    return cardValuesPart2[b] - cardValuesPart2[a];
}
