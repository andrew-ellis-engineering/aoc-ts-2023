interface Map {
    directions: string[],
    nodes: any
}

export const dataTransformer = (input: string[]) => {
    let map: Map = {directions: [], nodes: {}};

    // @ts-ignore
    map.directions = input.shift().split('');

    input.shift();

    for (let line of input) {
        let split = line.split(' = ');
        const node = split[0];
        split = split[1].replace('(', '').replace(')', '').split(', ');
        map.nodes[node] = split;
    }

    return map;
}

export const goLeft = (options: string[]) => {
    return options[0];
}

export const goRight = (options: string[]) => {
    return options[1];
}
