interface Springs {
    springData: string,
    damageData: number[]
}

export const dataTransformer = (lines: string[], part2 = false) => {
    let data: Springs[] = []
    for (let l of lines) {
        const split = l.split(' ');
        let sd = split[0];
        let dd = split[1].split(',').map((x) => Number(x));
        if (part2) {
            sd = [sd, sd, sd, sd, sd].join('?');
            dd = [...dd, ...dd, ...dd, ...dd, ...dd];
        }
        data.push({springData: sd, damageData: dd});
    }
    return data;
}

let map: Map<any, any>;

export const countCombinationsForRow = (row: Springs) => {
    let springs = row.springData;
    let damage = row.damageData;
    map = new Map();

    return count(springs, damage, 0, 0, 0);
}

const count = (springs: string, damage: number[], currentChar: number, damagedNum: number, currentSize: number) => {
    const args = JSON.stringify([currentChar, damagedNum, currentSize])
    if (map.has(args)) return map.get(args);

    if (currentChar === springs.length) {
        if (damagedNum === damage.length && currentSize === 0) {
            return 1;
        } else if (damagedNum === damage.length - 1 && damage[damagedNum] === currentSize) {
            return 1;
        } else {
            return 0;
        }
    }

    let characters = ['.', '#'];

    let currVal = 0;

    for (let c of characters) {
        if (springs[currentChar] === c || springs[currentChar] === '?') {
            if (c === '.' && currentSize === 0) {
                currVal += count(springs, damage, currentChar + 1, damagedNum, 0);
            } else if (c === '.' && currentSize > 0 && damagedNum < damage.length && damage[damagedNum] === currentSize) {
                currVal += count(springs, damage, currentChar + 1, damagedNum + 1, 0);
            } else if (c === '#') {
                currVal += count(springs, damage, currentChar + 1, damagedNum, currentSize + 1);
            }
        }
    }

    map.set(args, currVal);
    return currVal;
}
