import { readInputForDay, readInputForDayExample } from "../util";

type Range = { dest: number; source: number; len: number };
type Groups = Record<string, Range[]>;

const extractGroups = (input: string[]): Groups => {
  let currentGroup = "";
  let groups: Groups = {};

  for (let i = 2; i < input.length; i++) {
    if (input[i].match(/^[a-z]/)) {
      currentGroup = input[i].split(" ")[0];
    } else if (input[i] !== "") {
      const numbers = input[i].trim().split(/\s+/g).map(Number);

      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }
      groups[currentGroup].push({
        dest: numbers[0],
        source: numbers[1],
        len: numbers[2],
      });
    }
  }
  return groups;
};

export const part1 = (input: string[]): number => {
  const seeds = input[0].match(/\d+/g)?.map(Number) ?? [];
  const groups = extractGroups(input);

  return Math.min(
    ...seeds.map((seed) => {
      return Object.keys(groups).reduce(
        (acc: number, name) => lookupRange(groups[name], acc),
        seed
      );
    })
  );
};

export const part2 = (input: string[]): number => {
  const pairs =
    input[0]
      .match(/\d+ \d+/g)
      ?.map((pair) => (pair.split(" ") ?? []).map((p) => Number(p))) ?? [];

  const groups = extractGroups(input);
  const intersectionPoints = findIntersections(groups);

  const results = pairs.map(([start, length]) => {
    const arr: number[] = [];
    for (
      let i = start;
      i < start + length;
      i = intersectionPoints.find((point) => point > i) as number // Find intersection to lower number of possible seeds
    ) {
      arr.push(runForSeed(i, groups));
    }
    return Math.min(...arr);
  });

  return Math.min(...results);
};

const runForSeed = (seed: number, groups: Groups) => {
  return Object.keys(groups).reduce(
    (acc: number, name) => lookupRange(groups[name], acc),
    seed
  );
};

function findIntersections(groups: Groups): number[] {
  return Object.values(groups)
    .reverse()
    .reduce((acc, group) => {
      const sourceList = group.flatMap((x) => [x.source, x.source + 1]);
      const reverseDestinations = acc.map((dest) => {
        return lookupRangeReverse(group, dest);
      });
      return [...reverseDestinations, ...sourceList];
    }, [] as number[])
    .sort();
}

export function lookupRange(groupRange: Range[], seed: number) {
  const result = groupRange.find((r: Range, i) => {
    return seed >= r.source && seed <= r.source + (r.len - 1);
  });
  return result ? seed - result.source + result.dest : seed;
}

export function lookupRangeReverse(groupRange: Range[], destination: number) {
  const result = groupRange.find((r: Range, i) => {
    return destination >= r.dest && destination <= r.dest + (r.len - 1);
  });
  return result ? destination - result.dest + result.source : destination;
}

const data = await readInputForDayExample(5);
console.log("Result part 1", part1(data));
console.log("Result part 2", part2(data));
