import { printGrid, readInputForDay } from "../util";

type Point = { y: number; x: number };

export const main = async () => {
  const data = await readInputForDay(21);
  console.log("Result part 1", part1(data, 64));
  console.log("Result part 2", part2(data));
};

export function part1(input: string[], maxSteps = 16) {
  let grid = input.map((r) => r.split("")) as string[][];
  const start = findStartNode(grid);
  const initialValidPositions = [`${start.y + "," + start.x}`];
  const validPositions = processGrid(grid, initialValidPositions, maxSteps);
  return validPositions.length + 1;
}

export function part2(input: string[]) {
  return 0;
}

function processGrid(
  grid: string[][],
  initialValidPositions: string[],
  maxSteps: number
): string[] {
  let validPoints: string[] = initialValidPositions;
  let steps = 0;

  while (steps < maxSteps) {
    const newPositions: Set<string> = new Set();

    validPoints.forEach((position) => {
      const [y, x] = position.split(",").map(Number);
      [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1],
      ].forEach((position) => {
        const [y, x] = position;
        const char = grid[y]?.[x];

        if (char === ".") {
          newPositions.add(`${y},${x}`);
        }
      });
    });

    validPoints = Array.from(newPositions);
    steps++;
  }

  return validPoints;
}

function findStartNode(grid: string[][]): Point {
  let start: Point | null = null;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile == "S") {
        start = { x, y };
      }
    }
  }
  return start as Point;
}
