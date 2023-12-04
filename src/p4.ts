import { cpSync } from "fs";
import { readInputForDay, readInputForDayExample } from "../util";

const intersection = (arr1: number[], arr2: number[]) => {
  return arr1.filter((x) => arr2.includes(x));
};

export const part1 = (input: string[]) => {
  return input.reduce((acc, row) => {
    const [_, body] = row.split(":");
    const [winning, mine] = body
      .split("|")
      .map((set) => set.trim().split(/\s+/).map(Number));
    const wins = intersection(winning, mine).length;
    return acc + (wins > 0 ? Math.pow(2, wins - 1) : 0);
  }, 0);
};

export const part2 = (input: string[]) => {
  const cardCopies = new Array(input.length).fill(1);
  return input
    .map((row, cardIndex) => {
      const [_, body] = row.split(":");
      const [winning, mine] = body
        .split("|")
        .map((set) => set.trim().split(/\s+/).map(Number));

      const wins = intersection(mine, winning).length;
      for (let i = 1; i <= wins; i++) {
        cardCopies[cardIndex + i] += cardCopies[cardIndex];
      }
      return cardCopies[cardIndex];
    })
    .reduce((acc, points) => acc + points);
};

const data = await readInputForDay(4);
console.log("Result part 1", part1(data));
console.log("Result part 2", part2(data));