import { parseInput } from '../util';
import { mappingFunction, readNum } from './common';

const grid = parseInput({split: {delimiter: '\n', mapper: mappingFunction}});

// TODO: Complete Part 2

let sum = 0;

const notASymbol = new RegExp(/\d|\./);
const isANumber = new RegExp(/\d/);
const height = grid.length;
const width = grid[0].length;

for (const [row, line] of grid.entries()) {
    for (const [col, char] of line.entries()) {
        let count = 0;
        let product = 1;
        if (!notASymbol.test(char)) {
            for (let i = -1; i <= 1; i++) {
                let skip = 0;
                for (let j = -1; j <= 1; j++) {
                    
                    if (i == 0 && j == 0) continue;
                    if (i == 0) skip = 0;
                    if (
                        skip == 0
                        && row + i >= 0
                        && row + i < height
                        && col + j >= 0
                        && col + j < width 
                        && isANumber.test(grid[row + i][col + j])
                    ) {
                        let numToMult;
                        [skip, numToMult] = readNum(row + i, col + j, width, grid);
                        count++;
                        product *= numToMult;
                    }
                    if (skip > 0) skip--;
                }
            }
        }
        if (count == 2) {
            sum += product;
        }
    }
}

export default sum;