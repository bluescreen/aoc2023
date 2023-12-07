import { readInputForDay } from "../util";

export const part1 = (input: string[]): number => {
  const times = input[0].split(":")[1].trim().split(/\s+/).map(Number);
  const distances = input[1].split(":")[1].trim().split(/\s+/).map(Number);
  return runRace(times, distances);
};

export const part2 = (input: string[]): number => {
  const time = Number(input[0].split(":")[1].trim().split(/\s+/).join(""));
  const distance = Number(input[1].split(":")[1].trim().split(/\s+/).join(""));
  return runRace([time], [distance]);
};

const runRace = (times: number[], distances: number[]) => {
  return times.reduce((acc, time, index) => {
    let wins = 0;
    for (let ms = 1; ms < time; ms++) {
      const rest = ms * (time - ms);
      if (rest > distances[index]) {
        wins++;
      }
    }
    return acc * wins;
  }, 1);
};

export const main = async () => {
  const data = await readInputForDay(6);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};
