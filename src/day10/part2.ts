import { benchmark, parseInput } from '../util';
import { findStart, getNextDirection, getStartingDirection, cleanUpTiles, move, printGridColorLoop, replaceStart } from './common';

const grid = parseInput({split: {delimiter: '\n', mapper: (l:string) => l.split('')}});

// TODO: Complete Part 2

let enclosedTiles = 0;

benchmark(() => {
    let [row, col] = findStart(grid);
    let steps = 0;
    let dir = getStartingDirection(grid, row, col);
    let loop = [[row, col]];

    replaceStart(grid);

    [row,col] = move(row, col, dir);
    dir = getNextDirection(row, col, grid, dir);
    steps++;
    loop = [...loop, [row, col]];

    while (grid[row][col] !== 'S') {
        [row,col] = move(row, col, dir);
        dir = getNextDirection(row, col, grid, dir);
        steps++;
        loop = [...loop, [row, col]];
    }

    cleanUpTiles(loop, grid);

    for (let i = 0; i < grid.length; i++) {
        let inside = false;
        let prevCorner;
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '|') {
                inside = !inside;
            }
            if (grid[i][j] === 'F' || grid[i][j] === 'L') {
                prevCorner = grid[i][j];
            }
            if (prevCorner) {
                if (prevCorner === 'F' && grid[i][j] === 'J') {
                    prevCorner = undefined;
                    inside = !inside;
                }
                if (prevCorner === 'L' && grid[i][j] === '7') {
                    prevCorner = undefined;
                    inside = !inside;
                }
            }
            if (inside && grid[i][j] === '.') {
                // grid[i][j] = 'I';
                enclosedTiles++;
            }
        }
    }

    // printGridColorLoop(grid, loop);
})

export default enclosedTiles;
