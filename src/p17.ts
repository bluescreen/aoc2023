import { printGrid, readInputForDay, readInputForDayExample } from "../util";
import PriorityQueue from "./prioqueue";

type Node = {
  dist: number;
  r: number;
  c: number;
  dir: number;
  indir: number;
};
type Cell = {
  r: number;
  c: number;
};

export const main = async () => {
  const data = await readInputForDayExample(17);
  console.log("Result part 1", part1(data));
  // console.log("Result part 2", part2(data));

  // 820 -> too low
};

export const part1 = (input: string[]): number => {
  const grid: number[][] = input.map((r) => r.split("").map(Number));
  const start: Node = { dist: 0, r: 0, c: 0, dir: -1, indir: -1 };
  const end: Node = {
    dist: 0,
    r: grid.length - 1,
    c: grid[0].length - 1,
    dir: 1,
    indir: 0,
  };

  const { distance, path, directions } = djkstra(grid, start, end);
  printGrid(grid, "", path, (r, c) => mapDir[directions[r][c]]);

  return distance;
};

export const part2 = (input: string[]): number => {
  return 0;
};

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const mapDir: Record<number, string> = {
  "-1": " ",
  0: "^",
  1: ">",
  2: "v",
  3: "<",
};

export function djkstra(
  grid: number[][],
  start: Node,
  end: Node
): { distance: number; path: Set<string> } {
  const rows = grid.length;
  const cols = grid[0].length;
  const priorityQueue = new PriorityQueue<Node>();

  const distances: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Number.MAX_SAFE_INTEGER)
  );

  const previous: Node[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  distances[start.r][start.c] = 0;
  priorityQueue.enqueue(start, 0);
  const seen = new Set<string>();

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue() as Node;

    const key = [
      current.r,
      current.c,
      current.dir,
      current.indir,
      current.dist,
    ].join(",");
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    distances[current.r][current.c] = current.dist;

    for (const [dr, dc] of directions) {
      const neightbor: Cell = { r: current.r + dr, c: current.c + dc };

      const newDir = nextDir(dr, dc);
      const newIndir = newDir === current.dir ? current.indir + 1 : 1;
      const onlyThreeTimesConsecutive = newIndir <= 3;
      const notReverse = (newDir + 2) % 4 !== current.dir;

      if (
        inBounds(neightbor, rows, cols) &&
        onlyThreeTimesConsecutive &&
        notReverse
      ) {
        const weight = grid[neightbor.r][neightbor.c];

        if (current.dist + weight < distances[neightbor.r][neightbor.c]) {
          priorityQueue.enqueue(
            {
              dist: current.dist + weight,
              r: neightbor.r,
              c: neightbor.c,
              dir: newDir,
              indir: newIndir,
            },
            current.dist + weight
          );
          previous[neightbor.r][neightbor.c] = current;
        }
      }
    }

    console.log("MIN", previous[current.r]![current.c]!);
  }
  const path: Set<string> = new Set();
  const directionsResult = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  let current: Node = end;

  while (current !== null) {
    directionsResult[current.r][current.c] = current.dir;
    path.add(current.r + "," + current.c);

    console.log(current.r + "," + current.c, " -> ", current.dir);
    current = previous[current.r][current.c];
  }

  return {
    distance: distances[end.r][end.c],
    path,
    directions: directionsResult,
  };
}

function inBounds(node: Cell, rows: number, cols: number) {
  return node.r >= 0 && node.r < rows && node.c >= 0 && node.c < cols;
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
