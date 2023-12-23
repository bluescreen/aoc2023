import { readInputForDay } from "../util";

export const main = async () => {
  const data = await readInputForDay(23);
  console.log("Result part 1", await part1(data));
  console.log("Result part 2", await part2(data));
};

export async function part1(input: string[]) {
  return 0;
}

export async function part2(input: string[]) {
  return 0;
}
