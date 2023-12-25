import { readInputForDay } from "../util";

type Point = { y: number; x: number };

const STEPS = 2023 * 100 * 131 + 65;

export const main = async () => {
  const data = await readInputForDay(21);
  console.log("Result part 1", part1(data, 6));
  console.log("Result part 2 example 4", part2(data));
};

export function part1(input: string[], maxSteps = 16) {
  const grid = input.map((r) => r.split("")) as string[][];
  const start = findStartNode(grid);
  const validPositions = processGrid(grid, start, maxSteps);
  return validPositions.length + 1;
}

export const part2 = (input: string[]) => {
  const map = input.map((line) => line.split(""));

  const startY = map.findIndex((line) => line.includes("S"));
  const startX = map[startY].findIndex((char) => char === "S");
  map[startY][startX] = ".";

  const steps = STEPS;

  const fill = (x: number, y: number, maxSteps: number): number => {
    return processGrid(map, { y, x }, maxSteps).length;
  };

  const mapWidth = map.length;

  const gridWidth = ~~(steps / mapWidth) - 1;

  const odd = (~~(gridWidth / 2) * 2 + 1) ** 2;
  const even = (~~((gridWidth + 1) / 2) * 2) ** 2;

  const oddPoints = fill(startX, startY, mapWidth * 2 + 1);
  const evenPoints = fill(startX, startY, mapWidth * 2);

  const cornerTop = fill(startX, mapWidth - 1, mapWidth - 1);
  const cornerRight = fill(0, startY, mapWidth - 1);
  const cornerBottom = fill(startX, 0, mapWidth - 1);
  const cornerLeft = fill(mapWidth - 1, startY, mapWidth - 1);

  const smallSteps = ~~(mapWidth / 2) - 1;

  const smallTopRight = fill(0, mapWidth - 1, smallSteps);
  const smallTopLeft = fill(mapWidth - 1, mapWidth - 1, smallSteps);
  const smallBottomRight = fill(0, 0, smallSteps);
  const smallBottomLeft = fill(mapWidth - 1, 0, smallSteps);

  const largeSteps = ~~((mapWidth * 3) / 2) - 1;

  const largeTopRight = fill(0, mapWidth - 1, largeSteps);
  const largeTopLeft = fill(mapWidth - 1, mapWidth - 1, largeSteps);
  const largeBottomRight = fill(0, 0, largeSteps);
  const largeBottomLeft = fill(mapWidth - 1, 0, largeSteps);

  const mainPoints = odd * oddPoints + even * evenPoints;

  const small =
    (gridWidth + 1) *
    (smallBottomLeft + smallBottomRight + smallTopLeft + smallTopRight);

  const large =
    gridWidth *
    (largeBottomRight + largeBottomLeft + largeTopLeft + largeTopRight);

  return (
    mainPoints +
    small +
    large +
    cornerTop +
    cornerRight +
    cornerBottom +
    cornerLeft
  );
};

function processGrid(
  grid: string[][],
  start: Point,
  maxSteps: number
): string[] {
  let validPoints: string[] = [`${start.y + "," + start.x}`];

  for (let steps = 0; steps < maxSteps; steps++) {
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
  }

  return [...validPoints];
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
