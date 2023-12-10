import { readInputForDay } from "../util";
import Deque from "./deque";

const SymbolsMap: Record<string, string> = {
  L: "╰",
  J: "╯",
  F: "╭",
  7: "╮",
  ".": ".",
  "-": "─",
  "|": "|",
};

let DEBUG = false;
const START_PIPE = "7";

type Node = {
  x: number;
  y: number;
};

export const part1 = (input: string[]): number => {
  const grid = input.map((line) => line.split(""));
  const start: Node = findStartNode(grid);

  const visited: Set<string> = findLoop(grid, start);
  return Math.ceil(visited.size / 2);
};

function findStartNode(grid: string[][]): Node {
  let start: Node | null = null;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile == "S") {
        start = { x, y };
      }
    }
  }
  return start as Node;
}

export const part2 = (input: string[]): number => {
  const grid = input.map((line) => line.split(""));
  const start: Node = findStartNode(grid);

  const visited: Set<string> = findLoop(grid, start);
  replaceNonLoopCharacters(grid, visited);
  grid[start.y][start.x] = START_PIPE; // Hardcoded start pipe to connect

  const outside: Set<string> = scanHorizontalForOutsideTiles(grid);

  const totalCells = grid.length * grid[0].length;
  const unionSet: Set<string> = new Set([...outside, ...visited]);

  if (DEBUG) {
    printInnerTiles(grid, unionSet);
  }

  return totalCells - unionSet.size;
};

export const main = async () => {
  DEBUG = true;
  const data = await readInputForDay(10);

  console.log("Result part 1", part1(data));
  console.log("Result part 1", part2(data));
};

function printInnerTiles(grid: string[][], unionSet: Set<string>) {
  const all: Set<string> = new Set();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      all.add(y + "," + x);
    }
  }
  const insideSet: Set<string> = new Set(
    [...all].filter((x) => !unionSet.has(x))
  );
  printGridVisited(grid, insideSet);
}

function printGridVisited(grid: string[][], visited: Set<string | Node>) {
  let out = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      out += visited.has(`${y},${x}`) ? "X" : SymbolsMap[grid[y][x]];
    }
    out += "\n";
  }
  console.log(out);
}

function replaceNonLoopCharacters(grid: string[][], visited: Set<string>) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (!visited.has(`${y},${x}`)) {
        grid[y][x] = ".";
      }
    }
  }
}

function findLoop(grid: string[][], start: Node) {
  const checkNorth = (y: number, x: number, c: string) =>
    "S|JL".includes(c) && "|7F".includes(grid[y - 1][x]);
  const checkSouth = (y: number, x: number, c: string) =>
    "S|7F".includes(c) && "|JL".includes(grid[y + 1][x]);
  const checkWest = (y: number, x: number, c: string) =>
    "S-J7".includes(c) && "-LF".includes(grid[y][x - 1]);
  const checkEast = (y: number, x: number, c: string) =>
    "S-LF".includes(c) && "-J7".includes(grid[y][x + 1]);

  const queue = new Deque<Node>([start]);
  const visited: Set<string> = new Set();

  while (!queue.isEmpty()) {
    let { y, x } = queue.popLeft() as Node;
    let ch = grid[y][x];

    if (y > 0 && checkNorth(y, x, ch) && !visited.has(`${y - 1},${x}`)) {
      visited.add(`${y - 1},${x}`);
      queue.append({ y: y - 1, x });
    }

    if (
      y < grid.length - 1 &&
      checkSouth(y, x, ch) &&
      !visited.has(`${y + 1},${x}`)
    ) {
      visited.add(`${y + 1},${x}`);
      queue.append({ y: y + 1, x });
    }

    if (x > 0 && checkWest(y, x, ch) && !visited.has(`${y},${x - 1}`)) {
      visited.add(`${y},${x - 1}`);
      queue.append({ y, x: x - 1 });
    }

    if (
      x < grid[y].length - 1 &&
      checkEast(y, x, ch) &&
      !visited.has(`${y},${x + 1}`)
    ) {
      visited.add(`${y},${x + 1}`);
      queue.append({ y, x: x + 1 });
    }
  }
  return visited;
}

function scanHorizontalForOutsideTiles(grid: string[][]): Set<string> {
  const outside: Set<string> = new Set();
  for (let y = 0; y < grid.length; y++) {
    let isInside = false;
    let goingUp = null;
    for (let x = 0; x < grid[y].length; x++) {
      let c = grid[y][x];
      if (c === "|") {
        // Cross pipe -> Flip  Inside
        isInside = !isInside;
      } else if ("LF".includes(c)) {
        // Is Pipe going upwards?
        goingUp = c === "L";
      } else if ("7J".includes(c)) {
        // Are we crossing -> Flip Inside?
        if (c !== (goingUp ? "J" : "7")) {
          isInside = !isInside;
        }
        goingUp = null;
      }

      if (!isInside) {
        // Push all tiles that don't have the inside flag
        outside.add(y + "," + x);
      }
    }
  }
  return outside;
}
