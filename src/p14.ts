import { printGrid, readInputForDay, readInputForDayExample } from "../util";

type Grid = string[][];
type Node = { x: number; y: number };

export const main = async () => {
  const data = await readInputForDay(14);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export const part1 = (input: string[]): number => {
  let grid = input.map((r) => r.split(""));
  const roundRocks: Node[] = findRocks(grid);
  grid = rollNorth(grid, roundRocks);
  return calcAnswer(grid);
};

export const part2 = (input: string[]): number => {
  let grid = input.map((r) => r.split(""));
  const roundRocks: Node[] = findRocks(grid);
  let iterations = 1000000000;

  // use memoization to keep track of the grids
  const memo: { [key: string]: number } = {};

  for (let cycle = 0; cycle < iterations; cycle++) {
    grid = rockAndRollAllDirections(roundRocks, grid);
    const hash: string = grid.map((row) => row.join()).join("|");
    if (memo[hash]) {
      // Calculate the cycle length
      const cycleLength = cycle - memo[hash];
      // How many times does it repeat
      const numRepeats = Math.floor((iterations - cycle) / cycleLength);
      // The Trick: Jump the cycle by the amount of repitions * cycle length
      cycle += numRepeats * cycleLength;
    }
    memo[hash] = cycle;
  }
  return calcAnswer(grid);
};

function calcAnswer(resultGrid: string[][]) {
  let ans = 0;
  let i = resultGrid.length;
  for (let row of resultGrid) {
    ans += row.filter((c) => c === "O").length * i;
    i--;
  }
  return ans;
}

const rotate = (g: string[][]) =>
  g[0].map((_, i) => g.map((r) => r[i]).reverse());

function rockAndRollAllDirections(roundRocks: Node[], grid: string[][]) {
  let rocks = roundRocks;
  for (let i = 0; i < 4; i++) {
    rocks = findRocks(grid);
    grid = rollNorth(grid, rocks);
    grid = rotate(grid);
  }
  return grid;
}

const rollNorth = (grid: Grid, rocks: Node[]) => {
  for (let n of rocks) {
    for (let y = n.y; y >= 1 && grid[n.y - 1][n.x] == "."; y--) {
      grid[y][n.x] = ".";
      grid[y - 1][n.x] = "O";
      n.y = y - 1;
    }
  }
  return grid;
};

function findRocks(grid: Grid): Node[] {
  return grid.reduce((roundRocks: Node[], row, y) => {
    return row.reduce((rocksInRow: Node[], tile, x) => {
      if (tile === "O") {
        rocksInRow.push({ x, y });
      }
      return rocksInRow;
    }, roundRocks);
  }, []);
}
