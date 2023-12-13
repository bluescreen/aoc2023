import { readInputForDayRaw } from "../util";

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
    v: findMirrorsVertical(grid, target),
    h: findMirrorsHorizontal(grid, target),
  };
}

function findMirrorsHorizontal(grid: string[], target: number) {
  const rows = grid.length;
  const columns = grid[0].length;
  let result = 0;

  for (let col = 0; col < columns - 1; col++) {
    let missMatch = 0;

    for (let dc = 0; dc < columns; dc++) {
      let left = col - dc;
      let right = col + 1 + dc;

      if (left >= 0 && left < right && right < columns) {
        for (let r = 0; r < rows; r++) {
          if (grid[r][left] !== grid[r][right]) {
            missMatch += 1;
          }
        }
      }
    }

    if (missMatch === target) {
      result += col + 1;
      break;
    }
  }
  return result;
}

function findMirrorsVertical(grid: string[], target: number) {
  const rows = grid.length;
  const columns = grid[0].length;
  let result = 0;

  for (let row = 0; row < rows - 1; row++) {
    let missMatch = 0;

    for (let dr = 0; dr < rows; dr++) {
      let up = row - dr;
      let down = row + 1 + dr;

      if (up >= 0 && up < down && down < rows) {
        for (let c = 0; c < columns; c++) {
          if (grid[up][c] !== grid[down][c]) {
            missMatch += 1;
          }
        }
      }
    }

    if (missMatch === target) {
      result += row + 1;
      break;
    }
  }
  return result;
}
