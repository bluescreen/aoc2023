import { readInputForDay, readInputForDayExample } from "../util";

type Point = { r: number; c: number };

const allDirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const dirs: Record<string, number[][]> = {
  "^": [[-1, 0]],
  v: [[1, 0]],
  "<": [[0, -1]],
  ">": [[0, 1]],
  ".": allDirs,
};

type AdjencyGraph = Record<string, Record<string, number>>;
let graph: AdjencyGraph;
let count = 0;

export const main = async () => {
  const data = await readInputForDay(23);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
  console.log(count);
};

let seen: Set<string>;

export const part1 = (input: string[]): number => {
  const grid: string[][] = input.map((r) => r.split(""));
  const rows = grid.length - 1;
  const start = { r: 0, c: grid[0].findIndex((c) => c === ".") };
  const end = { r: rows, c: grid[rows].findIndex((c) => c === ".") };

  const points: Point[] = findCrossroadPoints(start, end, grid);
  graph = buildAdencyGraph(points, grid);

  seen = new Set();
  return findLongestPath(start, end);
};

export const part2 = (input: string[]): number => {
  const grid: string[][] = input.map((r) => r.split(""));
  const rows = grid.length - 1;
  const start = { r: 0, c: grid[0].findIndex((c) => c === ".") };
  const end = { r: rows, c: grid[rows].findIndex((c) => c === ".") };

  const points: Point[] = findCrossroadPoints(start, end, grid);
  graph = buildAdencyGraph(points, grid, true);

  seen = new Set();
  return findLongestPath(start, end);
};

function findLongestPath(current: Point, end: Point): number {
  if (isEqual(current, end)) {
    return 0;
  }

  let maxScore = -Infinity;
  count++;

  seen.add(current.r + "," + current.c);
  for (const next of Object.keys(graph[current.r + "," + current.c])) {
    const neighbor = parsePoint(next);
    if (!seen.has(neighbor.r + "," + neighbor.c)) {
      maxScore = Math.max(
        maxScore,
        findLongestPath(neighbor, end) +
          graph[current.r + "," + current.c][next]
      );
    }
  }
  seen.delete(current.r + "," + current.c);

  return maxScore;
}

function buildAdencyGraph(
  points: Point[],
  grid: string[][],
  ignoreSlopes = false
): AdjencyGraph {
  const graph: AdjencyGraph = {};
  points.forEach((pt) => {
    const key = pt.r + "," + pt.c;
    graph[key] = {};
  });

  for (const { r: sr, c: sc } of points) {
    const stack: [number, number, number][] = [[0, sr, sc]];
    const seen = new Set<string>();
    seen.add(`${sr},${sc}`);

    graph[`${sr},${sc}`] = {};

    while (stack.length > 0) {
      const [n, r, c] = stack.pop()!;

      if (n !== 0 && points.some(({ r: pr, c: pc }) => pr === r && pc === c)) {
        graph[`${sr},${sc}`][`${r},${c}`] = n;
        continue;
      }

      const checkDirs = ignoreSlopes ? allDirs : dirs[grid[r][c]];

      for (const [dr, dc] of checkDirs) {
        const [nr, nc] = [r + dr, c + dc];
        const neighborKey = `${nr},${nc}`;
        if (inBounds(grid, nr, nc) && !seen.has(neighborKey)) {
          stack.push([n + 1, nr, nc]);
          seen.add(neighborKey);
        }
      }
    }
  }
  return graph;
}

function findCrossroadPoints(start: Point, end: Point, grid: string[][]) {
  const points: Point[] = [start, end];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = grid[r][c];
      if (ch === "#") {
        continue;
      }

      let neighbors = 0;
      for (const [nr, nc] of [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ]) {
        if (
          0 <= nr &&
          nr < rows &&
          0 <= nc &&
          nc < cols &&
          grid[nr][nc] !== "#"
        ) {
          neighbors += 1;
        }
      }

      if (neighbors >= 3) {
        points.push({ r, c });
      }
    }
  }
  return points;
}

function inBounds(grid: string[][], row: number, col: number): boolean {
  return (
    0 <= row &&
    row < grid.length &&
    0 <= col &&
    col < grid[0].length &&
    grid[row][col] !== "#"
  );
}

function isEqual(point1: Point, point2: Point): boolean {
  return point1.r === point2.r && point1.c === point2.c;
}

function parsePoint(pointStr: string): Point {
  const [r, c] = pointStr.split(",").map(Number);
  return { r, c };
}
