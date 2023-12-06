
interface RaceRecord {
    time: number,
    distance: number
}

export const mapInputToRaceRecords = (input: string[]) => {
    let result: RaceRecord[] = [];
    
    let times = input[0].split(' ').filter((x) => x !== '');
    let distances = input[1].split(' ').filter((x) => x !== '');

    for (let i = 1; i < times.length; i++) {
        result = [...result, {time: Number(times[i]), distance: Number(distances[i])}]
    }

    return result;
}

export const mapInputToSingleRaceRecord = (input: string[]) => {    
    let time = input[0].split(' ').filter((x) => x !== '').filter((x) => x !== 'Time:').join('');
    let distance = input[1].split(' ').filter((x) => x !== '').filter((x) => x !== 'Distance:').join('');

    return {time: Number(time), distance: Number(distance)}
}

export const binarySearchBottomEnd = (record: RaceRecord) => {
    let left = 0, right = record.time;

    while (true) {
        let middle = Math.floor((left + right) / 2);
        if (calculateDistance(middle, record.time) > record.distance) {
            if (calculateDistance(middle - 1, record.time) <= record.distance) {
                return middle;
            } else {
                right = middle - 1;
            }
        } else {
            left = middle + 1;
        }
    }
}

const calculateDistance = (timeHeld: number, maxTime: number) => {
    return timeHeld * (maxTime - timeHeld);
}