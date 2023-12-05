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
        (acc: number, name) => lookup(groups[name], acc, name),
        seed
      );
    })
  );
};

export function lookup(groupRange: Range[], seed: number, name: string) {
  const result = groupRange.find((r: Range, i) => {
    return seed >= r.source && seed <= r.source + (r.len - 1);
  });
  return result ? seed + result.dest - result.source : seed;
}

export const part2 = (input: string[]): number => {
  return 0;
};

const data = await readInputForDay(5);
console.log("Result part 1", part1(data));
// console.log("Result part 2", part2(data));
