import { readInputForDay } from "../util";
import Deque from "./deque";

type Point = { x: number; y: number; dx: number; dy: number };

const upDown = [
  [1, 0],
  [-1, 0],
];
const leftRight = [
  [0, 1],
  [0, -1],
];

export const main = async () => {
  const data = await readInputForDay(16);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export const part1 = (input: string[]): number => {
  const grid = input.map((line) => line.split(""));
  const start: Point = { y: 0, x: -1, dy: 0, dx: 1 };
  const energized = findEnergized(start, grid);
  return energized.size;
};

export const part2 = (input: string[]): number => {
  const grid = input.map((line) => line.split(""));

  let maxEnergized = 0;
  const calcMax = (e: Point) =>
    Math.max(maxEnergized, findEnergized(e, grid).size);

  for (let y = 0; y < grid.length; y++) {
    maxEnergized = calcMax({ y, x: -1, dy: 0, dx: 1 });
    maxEnergized = calcMax({ y, x: grid[0].length, dy: 0, dx: -1 });
  }

  for (let x = 0; x < grid[0].length; x++) {
    maxEnergized = calcMax({ y: -1, x, dy: 1, dx: 0 });
    maxEnergized = calcMax({ y: grid.length, x, dy: -1, dx: 0 });
  }

  return maxEnergized;
};

function findEnergized(start: Point, grid: string[][]) {
  const visited: Set<string> = new Set();
  const queue: Deque<Point> = new Deque<Point>([start]);

  const visit = (next: Point) => {
    const newKey = `${next.y},${next.x},${next.dy},${next.dx}`;
    if (!visited.has(newKey)) {
      visited.add(newKey);
      queue.append(next);
    }
  };

  while (!queue.isEmpty()) {
    const { y, x, dy, dx } = queue.popLeft() as Point;

    const newY = y + dy;
    const newX = x + dx;

    if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) {
      continue;
    }

    const c = grid[newY][newX];
    if (c === "." || (c === "-" && dx !== 0) || (c === "|" && dy !== 0)) {
      visit({ y: newY, x: newX, dy, dx });
    } else if (c === "/") {
      visit({ y: newY, x: newX, dy: -dx, dx: -dy });
    } else if (c === "\\") {
      visit({ y: newY, x: newX, dy: dx, dx: dy });
    } else {
      const directions = c === "|" ? upDown : leftRight;
      for (const [dy, dx] of directions) {
        visit({ y: newY, x: newX, dy, dx });
      }
    }
  }

  return new Set(
    [...visited]
      .map((e) => e.split(",").slice(0, 2))
      .map(([x, y]) => x + "," + y)
  );
}
