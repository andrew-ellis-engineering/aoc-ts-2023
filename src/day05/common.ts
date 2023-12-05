interface Almanac {
    seeds: number[],
    mappings: Mapping[],
    seedRanges: SeedRange[]
}

interface SeedRange {
    start: number,
    end: number
}

class Mapping {
    ranges: Range[]
    name: string

    constructor(name: string) {
        this.ranges = [];
        this.name = name;
    }

    map(num: number): number {
        let left = 0, right  = this.ranges.length;

        while (left < right) {
            let middle = Math.floor((right + left) / 2);
            if(this.ranges[middle].isInRange(num)) {
                num = this.ranges[middle].compute(num);
                
                break;
            }

            if (num > this.ranges[middle].source) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return num;
    }

    mapRange(range: SeedRange): SeedRange[] {
        let mappedStart = this.map(range.start);
        let mappedEnd = this.map(range.end);

        if (mappedEnd - mappedStart === range.end - range.start) {
            return [{start: mappedStart, end: mappedEnd}];
        }

        let seedRanges: SeedRange[] = [];

        while (mappedEnd - mappedStart !== range.end - range.start) {
            let [newEnd, mappedNewEnd] = this.findEndOfRange(range.start);
            let newStart = newEnd + 1;
            let rangeToKeep = {start: mappedStart, end: mappedNewEnd};
            let newRange = {start: newStart, end: range.end};
            seedRanges = [...seedRanges, rangeToKeep];
            range = newRange;
            mappedStart = this.map(range.start);
            mappedEnd = this.map(range.end);
        }

        seedRanges = [...seedRanges, {start: mappedStart, end: mappedEnd}];

        return seedRanges;
    }

    findEndOfRange(num: number): number[] {
        let left = 0, right  = this.ranges.length;
        let found = false;
        let mappedEnd, originalEnd;

        while (left < right) {
            let middle = Math.floor((right + left) / 2);
            if(this.ranges[middle].isInRange(num)) {
                originalEnd = this.ranges[middle].sourceEnd();
                mappedEnd = this.ranges[middle].destEnd();
                found = true;
                break;
            }

            if (num > this.ranges[middle].source) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }

        if (!found) {
            originalEnd = this.ranges[left].source - 1;
            mappedEnd = this.ranges[left].dest - 1;
        }

        // @ts-ignore
        return [originalEnd, mappedEnd];
    }

    toString() {
        return `${this.name}:\n\t${this.ranges.map((r) => r.toString())}\n`
    }
}

class Range {
    dest: number;
    source: number;
    offset: number;

    constructor(dest: number, source: number, offset: number) {
        this.dest = dest;
        this.source = source;
        this.offset = offset
    }

    isInRange(check: number): boolean {
        if (check >= this.source && check < this.source + this.offset) {
            return true;
        }
        return false;
    }

    compute(num: number): number {
        return this.dest + (num - this.source);
    }

    sourceEnd() {
        return this.source + this.offset - 1;
    }

    destEnd() {
        return this.dest + this.offset - 1;
    }
    
    toString() {
        return `[${this.source}, ${this.source + this.offset}) -> [${this.dest}, ${this.dest + this.offset})`
    }
}

export const mappingFunction = (l: string) => {
    return String(l);
}

export const dataTransformer = (lines: string[], part2 = false): Almanac => {
    let seeds, seedRanges: SeedRange[] = [], mappings: Mapping[] = [];
    let m;

    for (let l of lines) {
        const split = l.split(' ');
        if (split[0] === 'seeds:') {
            split.shift();
            seeds = split.map((s) => Number(s));
            if (part2) {
                while (seeds.length > 0) {
                    let start = seeds.shift();
                    let offset = seeds.shift();
                    // @ts-ignore
                    let r = {start: start, end: start + offset - 1};
                    // @ts-ignore
                    seedRanges = [...seedRanges, r];
                }
            }
        } else {
            if (l === '' && m) {
                m.ranges = m.ranges.sort((a, b) => a.source - b.source);
                // @ts-ignore
                mappings = [...mappings, m]
                
            } else {
                if (l.includes('map')) {
                    m = new Mapping(split[0]);
                } else {
                    if (m) {
                        m.ranges = [...m.ranges, new Range(Number(split[0]), Number(split[1]), Number(split[2]))];
                    }
                }
            }
        }
    }
    // @ts-ignore
    return { seeds: seeds, seedRanges: seedRanges, mappings: mappings };
};