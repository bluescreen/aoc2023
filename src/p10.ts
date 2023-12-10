import { readInputForDay } from "../util";

class Deque<T> {
  constructor(public deque: T[]) {
    this.deque = deque;
  }

  append(element: T) {
    this.deque.push(element);
  }

  popLeft() {
    if (!this.isEmpty()) {
      return this.deque.shift();
    }
    return null;
  }

  isEmpty() {
    return this.deque.length === 0;
  }

  size() {
    return this.deque.length;
  }
}

type Node = {
  x: number;
  y: number;
};

export const part1 = (input: string[]): number => {
  const grid = input.map((line) => line.split(""));
  const start: Node = findStartNode(grid, input);

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

  return Math.ceil(visited.size / 2);
};

export const main = async () => {
  const data = await readInputForDay(10);

  console.log("Result part 1", part1(data));
};

function findStartNode(grid: string[][], input: string[]) {
  let start: Node = null;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = input[y][x];
      if (tile == "S") {
        start = { x, y };
      }
    }
  }
  return start;
}
