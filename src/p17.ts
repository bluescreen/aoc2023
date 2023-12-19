import { printGrid, readInputForDayExample } from "../util";
import PriorityQueue from "./prioqueue";

type Node = {
  dist: number;
  r: number;
  c: number;
  dir?: number;
  indir?: number;
};

export const main = async () => {
  const data = await readInputForDayExample(17);
  console.log("Result part 1", part1(data));
  // console.log("Result part 2", part2(data));
};

export const part1 = (input: string[]): number => {
  const grid: number[][] = input.map((r) => r.split("").map(Number));
  const start = { dist: 0, r: 0, c: 0, dir_: -1, indir: -1 };
  const end = {
    dist: 0,
    r: grid.length - 1,
    c: grid[0].length - 1,
  };

  const { distance, path } = djkstra(grid, start, end);
  printGrid(grid, "Djkstra", path);

  return distance;
};

export const part2 = (input: string[]): number => {
  return 0;
};

const directions = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];

export function djkstra(
  grid: number[][],
  start: Node,
  end: Node
): { distance: number; path: Set<string> } {
  console.log("Start", start);
  console.log("End", end);

  const rows = grid.length;
  const cols = grid[0].length;
  const queue = new PriorityQueue<Node>();

  const distances: number[][] = new Array(rows)
    .fill(Number.MAX_SAFE_INTEGER)
    .map(() => new Array(cols).fill(Number.MAX_SAFE_INTEGER));

  const previous: Node[][] = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(null));

  distances[start.r][start.c] = grid[start.r][start.c];
  queue.enqueue(start, grid[start.r][start.c]);
  const seen = new Set();

  let bestDistance = 0;
  while (!queue.isEmpty()) {
    const current = queue.dequeue() as Node;
    if (current.r === end.r && current.c === end.c) {
      bestDistance = current.dist;
      break;
    }

    const key = [current.r, current.c, current.dist].join(",");
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);

    for (const [dr, dc] of directions) {
      const newRow = current.r + dr;
      const newCol = current.c + dc;

      const newDir = nextDir(dr, dc);
      const newIndir =
        newDir !== current.dir && current.indir ? current.indir + 1 : 1;
      const onlyThreeTimesConsecutive = newIndir <= 3;
      //const notReverse = (newDir + 2) % 4 !== current.dir;

      if (inBounds(newRow, newCol, rows, cols) && onlyThreeTimesConsecutive) {
        const newDistance = current.dist + grid[newRow][newCol];
        if (newDistance < distances[newRow][newCol]) {
          const next: Node = {
            dist: newDistance,
            r: newRow,
            c: newCol,
            dir: newDir,
            indir: newIndir,
          };
          queue.enqueue(next, newDistance);
          previous[newRow][newCol] = { ...current };
        }
      }
    }
  }

  const path: Set<string> = new Set();
  let current: Node = end;

  while (!equals(current, start)) {
    console.log(current.r + "," + current.c, " -> ", current.dist);
    path.add(current.r + "," + current.c);
    current = previous[current.r][current.c];
  }

  return { distance: bestDistance, path };
}

function inBounds(newRow: number, newCol: number, rows: number, cols: number) {
  return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;
}

function equals(n1: Node, n2: Node) {
  return n1.r === n2.r && n1.c === n2.c;
}

function nextDir(dy: number, dx: number) {
  return dy === -1 && dx === 0
    ? 0
    : dy === 0 && dx === 1
    ? 1
    : dy === 1 && dx === 0
    ? 2
    : 3;
}

await main();
