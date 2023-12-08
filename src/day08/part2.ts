import { benchmark, parseInput } from '../util';
import { dataTransformer, goLeft, goRight } from './common';

const input = parseInput({split: {delimiter: '\n', mapper: (l:string) => String(l)}});
const data = dataTransformer(input);

// TODO: Complete Part 2

let totalSteps: BigInt = BigInt(0);

const startNodes = new RegExp(/..A/);

const endNodes = new RegExp(/..Z/);

const lcm = (nums: bigint[]) => {
    let hcf = BigInt(1);

    let min = nums[0];

    for (let n of nums) {
        if (n < min) min = n;
    }

    const checkFactor = (n: bigint[], i: bigint) => {
        for (let num of n) {
            if (num % i !== BigInt(0)) return false;
        }
        return true;
    }

    for (let i = BigInt(1); i <= min; i++) {
        if (checkFactor(nums, i)) hcf = i;
    }

    return nums.reduce((a, b) => (a * b) / hcf);
}

const findStartingNodes = (nodes: any) => {
    let result = [];
    for (let key in nodes) {
        if (key.match(startNodes)){
            result.push(key);
        }
    }
    return result;
}

benchmark(() => {
    const numDirections = data.directions.length;
    let startingNodes = findStartingNodes(data.nodes);

    let steps: bigint[] = [];

    console.log(startingNodes);

    for (let currentState of startingNodes) {
        let localSteps = 0;
        while (!currentState.match(endNodes)) {
            const dir = data.directions[localSteps % numDirections];
            if (dir == 'L') {
                currentState = goLeft(data.nodes[currentState]);
            } else {
                currentState = goRight(data.nodes[currentState]);
            }
            localSteps++;
        }
        steps = [...steps, BigInt(localSteps)];
    }
    
    totalSteps = lcm(steps);
})

export default totalSteps;
