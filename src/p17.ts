import { printGrid, readInputForDay, readInputForDayExample } from "../util";
import MinHeap from "./minheap";

type Node = {
  dist: number;
  r: number;
  c: number;
  dr: number;
  dc: number;
  indir: number;
};
const defaultNode = { dist: 0, r: 0, c: 0, dr: 0, dc: 0, indir: 0 };

let prev: Map<string, Node | null> = new Map();
let visited: Set<string> = new Set();

const DEBUG = false;

export const main = async () => {
  const data = await readInputForDayExample(17);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));

  const data2 = await readInputForDayExample(17, 2);
  console.log("Result part 2 test", part2(data2));

  const data3 = await readInputForDay(17);
  console.log("Result part 2 input", part2(data3));

  // 820 -> too low
  // 987 -> too low
};

export const part1 = (input: string[]): number => {
  const grid: number[][] = input.map((r) => r.split("").map(Number));
  const start: Node = defaultNode;
  const end: Node = {
    ...defaultNode,
    r: grid.length - 1,
    c: grid[0].length - 1,
  };

  const { distance, path } = dijkstra(grid, start, end, 1);
  if (DEBUG) printGrid(grid, "", path, () => "#");

  return distance;
};

export const part2 = (input: string[]): number => {
  const grid: number[][] = input.map((r) => r.split("").map(Number));

  const start: Node = defaultNode;
  const end: Node = {
    ...defaultNode,
    r: grid.length - 1,
    c: grid[0].length - 1,
  };

  const { distance, path } = dijkstra(grid, start, end, 2);
  if (DEBUG) printGrid(grid, "", path, () => "#");

  return distance;
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function dijkstra(
  grid: number[][],
  start: Node,
  end: Node,
  part = 1
): { distance: number; path: Set<string> } {
  const heap = new MinHeap<Node>();
  heap.heappush(start);
  const seen = new Set<string>();
  prev = new Map();
  visited = new Set();

  let best = 0;

  const maxConsecutives = part === 1 ? 3 : 10;
  const minMovement = part === 1 ? 0 : 4;

  while (heap.size() > 0) {
    const current = heap.heappop() as Node;
    if (isEndReached(current, end, minMovement)) {
      best = current.dist;
      break;
    }

    const key = createKey(current);
    if (seen.has(key)) continue;
    seen.add(key);

    exploreAdjacentNodes(current, grid, heap, maxConsecutives, minMovement);
  }

  const path = backtrackPath(end, prev);
  return { distance: best, path };
}

function isEndReached(current: Node, end: Node, minMovement: number): boolean {
  return (
    current.r === end.r && current.c === end.c && current.indir >= minMovement
  );
}

function exploreAdjacentNodes(
  current: Node,
  grid: number[][],
  heap: MinHeap<Node>,
  maxConsecutives: number,
  minMovement: number
): void {
  const { r, c, dr, dc, dist, indir } = current;

  if (indir < maxConsecutives && !(dr === 0 && dc === 0)) {
    exploreNeighborNode(
      grid,
      heap,
      r + dr,
      c + dc,
      dist,
      dr,
      dc,
      indir + 1,
      current
    );
  }

  if (indir >= minMovement || (dr === 0 && dc === 0)) {
    for (const [ndr, ndc] of directions) {
      if (!(ndr === dr && ndc === dc) && !(ndr === -dr && ndc === -dc)) {
        exploreNeighborNode(
          grid,
          heap,
          r + ndr,
          c + ndc,
          dist,
          ndr,
          ndc,
          1,
          current
        );
      }
    }
  }
}

function exploreNeighborNode(
  grid: number[][],
  heap: MinHeap<Node>,
  nr: number,
  nc: number,
  dist: number,
  dr: number,
  dc: number,
  indir: number,
  current: Node
): void {
  if (inBounds(grid, nr, nc)) {
    const neighbor = { dist: dist + grid[nr][nc], r: nr, c: nc, dr, dc, indir };
    const neighborKey = toString(neighbor);

    if (!visited.has(neighborKey)) {
      prev.set(neighborKey, current);
      visited.add(neighborKey);
    }
    heap.heappush(neighbor);
  }
}

function inBounds(grid: number[][], nr: number, nc: number) {
  return 0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0].length;
}

function createKey(current: Node) {
  return [current.r, current.c, current.dr, current.dc, current.indir].join(
    "-"
  );
}

function backtrackPath(end: Node, prev: Map<string, Node | null>): Set<string> {
  const path = new Set<string>();
  if (!DEBUG) {
    return path;
  }

  let current: Node | null = end;

  while (current !== null) {
    let key = toString(current);
    if (path.has(key)) {
      console.error("Cyclic path detected.");
      break;
    }
    path.add(key);
    current = prev.get(key) || null;
  }

  return path;
}

function toString(n: Node): string {
  return n.r + "," + n.c;
}
