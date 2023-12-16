export const mappingFunction = (l:string) => l.split('')

export const indexInBounds = (grid: string[][], row: number, col: number) => {
    const height = grid.length;
    const width = grid[0].length;
    return row >= 0 && col >= 0 && row < height && col < width;
}

export const createCounterArray = (height: number, width: number) => {
    let arr = [];
    for (let row = 0; row < height; row++) {
        let r = [];
        for (let col = 0; col < width; col++) {
            r.push(0);
        }
        arr.push(r);
    }

    return arr;
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    STAY
}

const vecMap = new Map<Direction, [number, number]>([
    [Direction.UP, [-1, 0]],
    [Direction.DOWN, [1, 0]],
    [Direction.LEFT, [0, -1]],
    [Direction.RIGHT, [0, 1]],
    [Direction.STAY, [0, 0]]
]);

let visited:([[number, number], Direction])[];

export const countEnergized = (grid: string[][], start?: [[number, number], Direction]) => {
    visited = [];
    let queue: [[[number, number], Direction]] = [start ? start : [[0,0], Direction.RIGHT]];
    let countGrid = createCounterArray(grid.length, grid[0].length);
    while (queue.length > 0) {
        let vec = queue.shift() || [[-1, -1], Direction.STAY];
        let dir = vec[1];
        let row = vec[0][0];
        let col = vec[0][1];

        while (indexInBounds(grid, row, col)) {
            countGrid[row][col] = 1;
            switch (grid[row][col]) {
                case '.':
                    break;
                case '|':
                    if ([Direction.LEFT, Direction.RIGHT].includes(dir)) {
                        if (!isVisted([[row, col], Direction.UP])) {
                            dir = Direction.UP;
                        } else {
                            row = -3;
                            col = -3;
                            break;
                        }
                        if (!isVisted([[row, col], Direction.DOWN])) {
                            queue.push([[row, col], Direction.DOWN]);
                            visited.push([[row, col], Direction.DOWN]);
                            visited.push([[row, col], Direction.UP]);
                        }
                    }
                    break;
                case '-':
                    if ([Direction.UP, Direction.DOWN].includes(dir)) {
                        if (!isVisted([[row, col], Direction.LEFT])) {
                            dir = Direction.LEFT;
                        } else {
                            row = -3;
                            col = -3;
                            break;
                        }
                        if (!isVisted([[row, col], Direction.RIGHT])) {
                            queue.push([[row, col], Direction.RIGHT]);
                            visited.push([[row, col], Direction.RIGHT]);
                        }
                    }
                    break;
                case '/':
                    switch (dir) {
                        case Direction.UP:
                            dir = Direction.RIGHT;
                            break;
                        case Direction.DOWN:
                            dir = Direction.LEFT;
                            break;
                        case Direction.LEFT:
                            dir = Direction.DOWN;
                            break;
                        case Direction.RIGHT:
                            dir = Direction.UP;
                            break;
                    }
                    break;
                case '\\':
                    switch (dir) {
                        case Direction.UP:
                            dir = Direction.LEFT;
                            break;
                        case Direction.DOWN:
                            dir = Direction.RIGHT;
                            break;
                        case Direction.RIGHT:
                            dir = Direction.DOWN;
                            break;
                        case Direction.LEFT:
                            dir = Direction.UP;
                            break;
                    }
                    break;
            }
            const inc = vecMap.get(dir) || [0,0];
            row += inc[0];
            col += inc[1];
        }
        
    }
    return countGrid.map((x) => x.reduce((a, b) => a+b)).reduce((a, b) => a+b);
}

const isVisted = (vec: [[number, number], Direction]) => {
    for (let v of visited) {
        if (v[0][0] === vec [0][0] && v[0][1] === vec [0][1] && v[1] === vec [1]) return true;
    }
    return false;
}
