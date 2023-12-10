export const findStart = (grid: string[][]) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'S') return [i,j]
        }
    }
    return [0,0];
}

export const replaceStart = (grid: string[][]) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'S') {
                grid[i][j] === 'J';
                return;
            }
        }
    }
}

export const getStartingDirection = (grid: string[][], row: number, col: number) => {
    if (row > 0) {
        if (grid[row-1][col] === '|') return Direction.NORTH;
        if (grid[row-1][col] === 'F') return Direction.NORTH;
        if (grid[row-1][col] === '7') return Direction.NORTH;
    }
    
    if (row < grid.length-1) {
        if (grid[row+1][col] === '|') return Direction.SOUTH;
        if (grid[row+1][col] === 'J') return Direction.SOUTH;
        if (grid[row+1][col] === 'L') return Direction.SOUTH;
    }
    
    if (col >=0) {
        if (grid[row][col+1] === '-') return Direction.EAST;
        if (grid[row][col+1] === 'J') return Direction.EAST;
        if (grid[row][col+1] === '7') return Direction.EAST;
    }
    
    if (grid[row][col-1] === '-') return Direction.WEST;
    if (grid[row][col-1] === 'F') return Direction.WEST;
    return Direction.WEST;
}


enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

export const move = (row: number, col: number, dir: Direction) => {
    switch (dir) {
        case Direction.NORTH:
            return [row-1, col];
        case Direction.SOUTH:
            return [row+1, col];
        case Direction.EAST:
            return [row, col+1];
        case Direction.WEST:
            return [row, col-1];
    }
}

export const getNextDirection = (row: number, col: number, grid: string[][], dir: Direction) => {
    const current = grid[row][col];

    if (current === '|' || current === '-') return dir;

    switch (current) {
        case 'F':
            if (dir === Direction.NORTH) return Direction.EAST;
            return Direction.SOUTH;
        case 'J':
            if (dir === Direction.EAST) return Direction.NORTH;
            return Direction.WEST;
        case 'L':
            if (dir === Direction.SOUTH) return Direction.EAST;
            return Direction.NORTH;
        case '7':
            if (dir === Direction.NORTH) return Direction.WEST;
            return Direction.SOUTH;
    }
    return Direction.NORTH;
}

export const cleanUpTiles = (loop: number[][], grid: string[][]) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (!includes([i,j], loop)) grid[i][j] = '.';
        }
    }
}

export const includes = (needle: number[], haystack: number[][]) => {
    for (let h of haystack) {
        if (needle[0] === h[0] && needle[1] === h[1]) return true;
    }
    return false;
}

export const colorize = new (class {
    color = (code: number, ended = false, ...messages: any[]) =>
        `\x1b[${code}m${messages.join(" ")}${ended ? "\x1b[0m" : ""}`;
    red = this.color.bind(null, 31, true);
    green = this.color.bind(null, 32, true);
})();

const color = colorize;

export const printGridColorLoop = (grid: string[][], loop: number[][]) => {
    let s = '';
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let char = grid[i][j];
            if (grid[i][j] == 'I') {
                char = color.green(char);
            } else if (includes([i,j], loop)) {
                char = color.red(char);
            }
            s = s + char;
        }
        s = s + '\n';
    }
    console.log(s);
}