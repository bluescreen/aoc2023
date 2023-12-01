import { readInputForDay } from "../util";

const map: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export const part1 = (input: string[]) => {
  let sum = 0;
  for (let row of input) {
    const matches = row.match(/\d/g);
    if (matches && matches.length > 0) {
      const first = matches[0];
      const last = matches.length > 0 ? matches[matches.length - 1] : "";
      const num = parseInt(first + (last ?? ""));
      sum += num;
    }
  }
  return sum;
};

export const part2 = (input: string[]) => {
  let sum = 0;

  for (let row of input) {
    const before = row.matchAll(
      /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
    );
    const matches = [...before].map((i) => i.slice(1)[0]);

    if (matches && matches.length > 0) {
      const first = toNumber(matches[0]);
      const last =
        matches.length > 1 ? toNumber(matches[matches.length - 1]) : first;
      const num = first * 10 + last;
      sum += num;
    }
  }
  return sum;
};

const toNumber = (val: string): number => {
  return parseInt(map[val] ? map[val] : val);
};

const data = await readInputForDay(1);
console.log("Result part 1", part1(data));
console.log("Result part 2", part2(data));
