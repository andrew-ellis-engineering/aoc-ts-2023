interface LineInfo {
    draws: Draw[],
    id: number
}

interface Draw {
    red: number,
    green: number,
    blue: number
}

export const mappingFunction = (l: string): LineInfo => {
    let lineInfo: LineInfo = {
        draws: [],
        id: 0
    };
    let split;
    split = l.split(':');
    // @ts-ignore
    lineInfo.id = Number(split[0].match(/\d+/)[0]);
    let individualDraws = split[1].split('; ');
    lineInfo.draws = individualDraws.map((d) => {
        let dice = d.split(',');
        let thisDraw: Draw = {
            red: 0,
            green: 0,
            blue: 0
        };
        for (let numberAndcolor of dice) {
            // @ts-ignore
            let color = numberAndcolor.match(/red|green|blue/)[0];
            // @ts-ignore
            let number = Number(numberAndcolor.match(/\d+/)[0]);
            switch (color) {
                case 'red':
                    thisDraw.red = number;
                    break;
                case 'green':
                    thisDraw.green = number;
                    break;
                case 'blue':
                    thisDraw.blue = number;
                    break;
            }
            
        }
        return thisDraw;
    });
    return lineInfo;
};