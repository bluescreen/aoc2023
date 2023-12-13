import { readInputForDayRaw } from "../util";

enum Direction {
  Horizontal,
  Vertical,
}

export const main = async () => {
  const data = await readInputForDayRaw(13);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export const part1 = (input: string): number => {
  return input
    .split("\n\n")
    .map((grid, index) => checkForMirrors(grid, index, 0))
    .reduce((acc, { v, h }) => acc + v * 100 + h, 0);
};

export const part2 = (input: string): number => {
  return input
    .split("\n\n")
    .map((grid, index) => checkForMirrors(grid, index, 1))
    .reduce((acc, { v, h }) => acc + v * 100 + h, 0);
};

function checkForMirrors(g: string, i: number, target: number) {
  const grid = g.split("\n");
  return {
    h: findMirrors(grid, target, Direction.Horizontal),
    v: findMirrors(grid, target, Direction.Vertical),
  };
}

function findMirrors(grid: string[], target: number, dir: Direction) {
  const rows = grid.length;
  const columns = grid[0].length;
  let result = 0;

  const range = dir === Direction.Horizontal ? columns : rows;
  const range2 = dir === Direction.Horizontal ? rows : columns;

  for (let mainIndex = 0; mainIndex < range - 1; mainIndex++) {
    let missMatch = 0;

    for (let delta = 0; delta < range; delta++) {
      const first = mainIndex - delta;
      const second = mainIndex + 1 + delta;

      if (first >= 0 && first < second && second < range) {
        for (let index = 0; index < range2; index++) {
          const isMissMatch =
            dir === Direction.Horizontal
              ? grid[index][first] !== grid[index][second]
              : grid[first][index] !== grid[second][index];
          if (isMissMatch) {
            missMatch += 1;
          }
        }
      }
    }

    if (missMatch === target) {
      result += mainIndex + 1;
    }
  }
  return result;
}
