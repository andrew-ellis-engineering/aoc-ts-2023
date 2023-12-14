enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

export const spinCycle = (grid: string[][]): [number, string[][]] => {
    const str = gridToString(grid);

    grid = rollAll(grid, Direction.NORTH);
    grid = rollAll(grid, Direction.WEST);
    grid = rollAll(grid, Direction.SOUTH);
    grid = rollAll(grid, Direction.EAST);
    const score = scoreGrid(grid);
    return [score, grid];
}

export const rollAll = (grid: string[][], dir: Direction = Direction.NORTH) => {
    if (dir === Direction.NORTH || dir === Direction.SOUTH) {
        if (dir === Direction.NORTH) {
            for (let i = 0; i < grid.length; i++) {
                grid = rollVertical(i, grid, dir);
            }
        } else {
            for (let i = grid.length-1; i >= 0; i--) {
                grid = rollVertical(i, grid, dir);
            }
        }
        
    } else {
        if (dir === Direction.WEST) {
            for (let i = 0; i < grid[0].length; i++) {
                grid = rollHorizontal(i, grid, dir);
            }
        } else {
            for (let i = grid[0].length-1; i >= 0; i--) {
                grid = rollHorizontal(i, grid, dir);
            }
        }
    }

    return grid;
}

const rollVertical = (row: number, grid: string[][], dir: Direction) => {
    const inc = dir === Direction.NORTH ? -1 : 1;
    const cond = dir === Direction.NORTH ? (i: number) => {return i >= 0} : (i: number) => {return i < grid.length};

    for (let j = 0; j < grid[0].length; j++) {
        if (grid[row][j] === 'O') {
            let index = row + inc;
            while (cond(index) && grid[index][j] === '.') {
                index += inc;
            }
            index -= inc;
            grid[row][j] = '.';
            grid[index][j] = 'O';
        }
    }

    return grid;
}

const rollHorizontal = (col: number, grid: string[][], dir: Direction) => {
    const inc = dir === Direction.WEST ? -1 : 1;
    const cond = dir === Direction.WEST ? (i: number) => {return i >= 0} : (i: number) => {return i < grid[0].length};

    for (let j = 0; j < grid.length; j++) {
        if (grid[j][col] === 'O') {
            let index = col + inc;
            while (cond(index) && grid[j][index] === '.') {
                index += inc;
            }
            index -= inc;
            grid[j][col] = '.';
            grid[j][index] = 'O';
        }
    }

    return grid;
}

export const scoreGrid = (grid: string[][]) => {
    let score = 0;
    let length = grid.length;
    let width = grid[0].length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (grid[i][j] === 'O') {
                score += length - i;
            }
        }
    }
    return score;
}

export const gridToString = (grid: string[][]) => {
    return grid.map((x) => x.join('')).join('\n');
}