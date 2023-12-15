export const mapToAsciiArr = (l:string) => {
    return l.split('').map((x:string) => x.charCodeAt(0));
}

export const hash = (l:string) => {
    let current = 0;
    const ascii = l.split('').map((x:string) => x.charCodeAt(0))
    for (let n of ascii) {
        current += n;
        current = (current * 17) % 256;
    }

    return current;
}

export const getBoxLabelLens = (l:string): [number, string, number | undefined] => {
    let arr = l.replace('-', '').split('=');
    const box = hash(arr[0]);
    const label = arr[0];
    if (arr.length === 2) {
        return [box, label, Number(arr[1])];
    }
    return [box, label, undefined];
}

export const createMap = () => {
    let map = new Map<number, any[][]>();
    for (let i = 0; i < 256; i++) {
        map.set(i, []);
    }
    return map;
}

export const remove = (map: Map<number, any[][]>, box: number, label: string) => {
    const list = map.get(box) || [];
    const index = indexOf(label, list);

    if (index >= 0) {
        map.set(box, [...list.slice(0,index), ...list.slice(index+1)]);
    }

    return map;
}

export const replaceOrAdd = (map: Map<number, any[][]>, box: number, label: string, lens: number) => {
    const list = map.get(box) || [];
    const index = indexOf(label, list);

    if (index >= 0) {
        map.set(box, [...list.slice(0,index), [label, lens], ...list.slice(index+1)]);
    } else {
        map.set(box, [...list, [label, lens]]);
    }
    
    return map;
}

const indexOf = (search: string, list: any[][]) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] === search) return i;
    }
    return -1;
}
