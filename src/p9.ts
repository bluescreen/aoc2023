import { readInputForDay } from "../util";

export const main = async () => {
  const data = await readInputForDay(9);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export const part1 = (input: string[]): number => {
  const hists = input.map((line) => line.split(" ").map(Number));
  return prediction(hists).reduce((acc, c) => {
    return acc + c;
  }, 0);
};

export const part2 = (input: string[]): number => {
  const histsReverse = input
    .map((line) => line.split(" ").map(Number))
    .map((m) => m.reverse());

  return prediction(histsReverse).reduce((acc, c) => {
    return acc + c;
  }, 0);
};

function prediction(history: number[][]) {
  return history.map((values) => {
    const allSteps = [values];

    while (
      !allSteps[allSteps.length - 1].every(
        (n) => n === (allSteps.at(-1) ?? []).at(0)
      )
    ) {
      const current = allSteps.at(-1) ?? [];
      const deltas: number[] = [];

      for (let i = 1; i < current.length; i++) {
        const n = current[i];
        deltas.push(n - current[0]);
        current[0] = n;
      }

      allSteps.push(deltas);
    }

    return allSteps.reduce((acc, steps: number[]) => {
      return acc + (steps.at(-1) ?? 0);
    }, 0);
  });
}
