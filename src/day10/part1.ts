import { benchmark, parseInput } from '../util';
import { findStart, getNextDirection, getStartingDirection, move } from './common';

const grid = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 1

let midPoint = 0;

benchmark(() => {
    let [row, col] = findStart(grid);
    let steps = 0;
    let dir = getStartingDirection(grid, row, col);

    [row,col] = move(row, col, dir);
    dir = getNextDirection(row, col, grid, dir);
    steps++;

    while (grid[row][col] !== 'S') {
        [row,col] = move(row, col, dir);
        dir = getNextDirection(row, col, grid, dir);
        steps++;
    }

    midPoint = Math.floor(steps / 2);
})

export default midPoint;
