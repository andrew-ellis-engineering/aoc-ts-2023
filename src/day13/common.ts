interface Pattern {
    grid: string[][]
}

export const dataTransformer = (lines: string[]) => {
    let p: Pattern = { grid: [] };
    let patterns: Pattern[] = [];

    for (let l of lines) {
        if (l === '') {
            patterns.push(p);
            p = { grid: [] };
        } else {
            p.grid.push(l.split(''));
        }
    }

    return patterns;
}

export const findMirrorIndexVertical = (grid: string[][], part2 = false) => {
    const height = grid.length;
    const width = grid[0].length;

    let i = 0;

    const faultTolerance = part2 ? 1 : 0;

    for (i = 0; i < width-1; i++) {
        let leftVert = [];
        let rightVert = [];

        for (let j = 0; j < height; j++) {
            leftVert.push(grid[j][i]);
            rightVert.push(grid[j][i+1]);
        }
        const initialDiff = compareArrays(leftVert, rightVert)
        if (initialDiff <= faultTolerance) {
            let k = 1;
            let mirror = true;
            let smudgeCount = initialDiff;
            while (i-k >= 0 && i+1+k < width) {
                leftVert = [];
                rightVert = [];
    
                for (let j = 0; j < height; j++) {
                    leftVert.push(grid[j][i-k]);
                    rightVert.push(grid[j][i+1+k]);
                }
                const diff = compareArrays(leftVert, rightVert)
                if (diff !== 0) {
                    if (part2) {
                        smudgeCount += diff;
                        if (smudgeCount > 1) {
                            mirror = false;
                            break;
                        }
                    } else {
                        mirror = false;
                        break;
                    }
                }
                k++;
            }
            if (mirror && smudgeCount === faultTolerance) return i;
        }
    }

    return i;
}

export const findMirrorIndexHorizontal = (grid: string[][], part2 = false) => {
    const height = grid.length;
    const width = grid[0].length;

    let i = 0;

    const faultTolerance = part2 ? 1 : 0;

    for (i = 0; i < height-1; i++) {
        const initialDiff = compareArrays(grid[i], grid[i+1]);
        if (initialDiff <= faultTolerance) {
            let j = 1;
            let mirror = true;
            let smudgeCount = initialDiff;
            while (i-j >= 0 && i+1+j < height) {
                const diff = compareArrays(grid[i-j], grid[i+1+j]);
                if (diff !== 0) {
                    if (part2) {
                        smudgeCount += diff;
                        if (smudgeCount > 1) {
                            mirror = false;
                            break;
                        }
                    } else {
                        mirror = false;
                        break;
                    }
                }
                j++;
            }
            if (mirror && smudgeCount === faultTolerance) return i;
        }
    }

    return i;
}

const compareArrays = (a: string[], b: string[]) => {
    let diffCount = 0;
    for (let j = 0; j < a.length; j++) {
        if (a[j] !== b[j]) diffCount++;
    }
    return diffCount;
}

export const logGrid = (grid: string[][]) => {
    console.log(grid.map((x) => x.join('')).join('\n'))
}
