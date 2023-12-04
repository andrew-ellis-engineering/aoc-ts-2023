export const mappingFunction = (line: string) => {
    return line.split('');
}

export const readNum = (row: number, col: number, width: number, grid: string[][]): number[] => {
    let originalCol = col;
    const isANumber = new RegExp(/\d/);
    let number = 0;

    while (col > 0 && isANumber.test(grid[row][col])) {
        col--;
    }
    if (!isANumber.test(grid[row][col])) {
        col++;
    }
    while (col < width && isANumber.test(grid[row][col])) {
        number *= 10;
        number += Number(grid[row][col]);
        col++;
    }

    return [col - originalCol, number];
}