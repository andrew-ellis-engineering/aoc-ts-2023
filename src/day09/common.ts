export const mappingFunction = (l: string) => {
    return l.split(' ').map((x) => Number(x));
}

export const checkAllZeros = (arr: number[]) => {
    for (let n of arr) if (n !== 0) return false;
    return true;
}

export const extrapolate = (arrs: number[][]) => {
    let current = 0;
    for (let i = arrs.length - 1; i > 0; i--) {
        let nextLen = arrs[i-1].length;
        current = current + arrs[i-1][nextLen-1];
    }
    return current;
}

export const extrapolateBackward = (arrs: number[][]) => {
    let current = 0;
    for (let i = arrs.length - 1; i > 0; i--) {
        current = arrs[i-1][0] - current;
    }
    return current;
}
