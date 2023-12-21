import { printGrid, readInputForDay, readInputForDayExample } from "../util";

type Point = { y: number; x: number };

export const main = async () => {
  const data1 = await readInputForDayExample(21);
  console.log("Result part 1", part1(data1, 6));

  const data2 = await readInputForDayExample(21);
  console.log("\nResult part 2 example", part2(data2, 6));

  // const data = await readInputForDay(21);
  //console.log("\nResult part 2 real", part2(data, 265013656));
};

export function part1(input: string[], maxSteps = 16) {
  const grid = input.map((r) => r.split("")) as string[][];
  const start = findStartNode(grid);
  const validPositions = processGrid(grid, start, maxSteps);

  printGrid(grid, "", new Set(validPositions), () => "O");

  return validPositions.length + 1;
}

export function part2(input: string[], maxSteps = 6) {
  const grid = input.map((r) => r.split("")) as string[][];
  const start = findStartNode(grid);

  const fill = (r: number, c: number, n: number): number => {
    const points = processGrid(grid, { y: r, x: c }, n);
    return points.length;
  };

  const size: number = grid.length;
  const steps: number = maxSteps;
  const sr: number = start.y;
  const sc: number = start.x;

  console.log({ size, steps, sr, sc });

  const grid_width: number = Math.floor(steps / size) - 1;

  console.log({ steps, grid_width });

  const odd: number = Math.pow(Math.floor(grid_width / 2) * 2 + 1, 2);
  const even: number = Math.pow(Math.floor((grid_width + 1) / 2) * 2, 2);

  const oddPoints: number = fill(sr, sc, size * 2 + 1);
  const evenPoints: number = fill(sr, sc, size * 2);

  const cornerTop: number = fill(size - 1, sc, size - 1);
  const cornerRight: number = fill(sr, 0, size - 1);
  const cornerBottom: number = fill(0, sc, size - 1);
  const cornerLeft: number = fill(sr, size - 1, size - 1);
  const sumCorners = cornerTop + cornerRight + cornerBottom + cornerLeft;

  const half = Math.floor(size / 2);
  const smallTopRight: number = fill(size - 1, 0, half - 1);
  const smallTopLeft: number = fill(size - 1, size - 1, half - 1);
  const smallBottomRight: number = fill(0, 0, half - 1);
  const smallBottomLeft: number = fill(0, size - 1, half - 1);
  const sumSmall =
    smallTopRight + smallTopLeft + smallBottomRight + smallBottomLeft;

  const edge = Math.floor((size * 3) / 2);
  const largeTopRight: number = fill(size - 1, 0, edge - 1);
  const largeTopLeft: number = fill(size - 1, size - 1, edge - 1);
  const largeBottomRight: number = fill(0, 0, edge - 1);
  const largeBottomLeft: number = fill(0, size - 1, edge - 1);
  const sumLarge =
    largeTopRight + largeTopLeft + largeBottomRight + largeBottomLeft;

  return (
    odd * oddPoints +
    even * evenPoints +
    sumCorners +
    (grid_width + 1) * sumSmall +
    grid_width * sumLarge +
    1
  );
}

// Too low
// 6121815468
// 1202207955932
// 1202181454566
// 618220507929054
// 62776811058489530

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
