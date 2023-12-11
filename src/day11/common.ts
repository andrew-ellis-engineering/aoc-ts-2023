export const expandUniverse = (u: string[][], part2 = false) => {
    u = expandRows(u, part2);
    u = expandCols(u, part2);
    return u;
}

const expandRows = (u: string[][], part2 = false) => {
    let i = 0;
    let size = u.length;
    while (i < size) {
        if (rowIsEmpty(u[i])) {
            if (part2) {
                for (let j = 0; j < u[i].length; j++) {
                    u[i][j] = '*';
                }
            } else {
                u = [...u.slice(0, i+1), u[i], ...u.slice(i+1)];
                i++;
                size++;
            }
        }
        i++;
    }

    return u;
}

const expandCols = (u: string[][], part2 = false) => {
    let i = 0;
    let size = u[0].length;
    while (i < size) {
        if (colIsEmpty(u, i)) {
            if (part2) {
                for (let j = 0; j < u.length; j++) {
                    u[j][i] = '*';
                }
            } else {
                for (let j = 0; j < u.length; j++) {
                    u[j] = [...u[j].slice(0, i+1), '.', ...u[j].slice(i+1)];
                }
                i++;
                size++;
            }
        }
        i++;
    }

    return u;
}

const rowIsEmpty = (r: string[]) => {
    for (let space of r) {
        if (space === '#') return false;
    }
    return true;
}

const colIsEmpty = (u: string[][], col: number) => {
    for (let r of u) {
        let space = r[col];
        if (space === '#') return false;
    }
    return true;
}

export const indexGalaxies = (u: string[][]) => {
    let index: number[][] = [];
    for (let i = 0; i < u.length; i++) {
        for (let j = 0; j < u[0].length; j++) {
            if (u[i][j] === '#') index = [...index, [i,j]];
        }
    }
    return index;
}

export const manhattanDistance = (a: number[], b: number[]) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export const manhattanDistanceWithExpansionFactor = (a: number[], b: number[], u: string[][], ef: number) => {
    let startRow, stopRow, startCol, stopCol;
    let dist = 0;
    if (a[0] <= b[0]) {
        startRow = a[0];
        stopRow = b[0];
    } else {
        startRow = b[0];
        stopRow = a[0];
    }
    if (a[1] <= b[1]) {
        startCol = a[1];
        stopCol = b[1];
    } else {
        startCol = b[1];
        stopCol = a[1];
    }
    let i = startRow;
    let j = startCol;
    while (i < stopRow) {
        if (u[i][j] === '*') {
            dist += ef;
        } else {
            dist++;
        }
        i++;
    }
    while (j < stopCol) {
        if (u[i][j] === '*') {
            dist += ef;
        } else {
            dist++;
        }
        j++;
    }

    return dist;
}
