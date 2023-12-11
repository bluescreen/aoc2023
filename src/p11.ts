import { printGrid, readInputForDay, readInputForDayExample } from "../util";

class Node {
  constructor(public x: number, public y: number, public num: number) {}

  manhattanDistance(p: Node) {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = p.x;
    var y2 = p.y;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}

export const main = async () => {
  const data = await readInputForDay(11);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export const part1 = (input: string[]): number => {
  let grid = input.map((line) => line.split(""));
  const { galaxies, empty } = findGalaxies(grid);
  const { emptyLinesX, emptyLinesY } = findEmptyLines(galaxies, empty);

  return findDistances(galaxies, emptyLinesX, emptyLinesY, 2).reduce(
    (acc, dist) => acc + dist
  );
};

export const part2 = (input: string[], growth?: number): number => {
  let grid = input.map((line) => line.split(""));
  const { galaxies, empty } = findGalaxies(grid);
  const { emptyLinesX, emptyLinesY } = findEmptyLines(galaxies, empty);

  return findDistances(
    galaxies,
    emptyLinesX,
    emptyLinesY,
    growth ?? 1000_000
  ).reduce((acc, dist) => acc + dist);
};

function findEmptyLines(galaxies: Node[], empty: Node[]) {
  const galaxyX = new Set(galaxies.map((galaxy: Node) => galaxy.x));
  const emptyLinesX = new Set(
    empty.filter((value: Node) => !galaxyX.has(value.x)).map((m) => m.x)
  );

  const galaxyY = new Set(galaxies.map((galaxy: Node) => galaxy.y));
  const emptyLinesY = new Set(
    empty.filter((value: Node) => !galaxyY.has(value.y)).map((m) => m.y)
  );
  return { emptyLinesX, emptyLinesY };
}

function findGalaxies(grid: string[][]) {
  const galaxies: Node[] = [];
  const empty: Node[] = [];

  let count = 1;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const tile = grid[y][x];
      if (tile == "#") {
        galaxies.push(new Node(x, y, count));
        count++;
      } else {
        empty.push(new Node(x, y, 0));
      }
    }
  }
  return { galaxies, empty };
}

function findDistances(
  galaxies: Node[],
  emptyX: Set<Number>,
  emptyY: Set<number>,
  growth = 2
) {
  const distances = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < i; j++) {
      const a = galaxies[i];
      const b = galaxies[j];
      distances.push(calcDistance(a, b, emptyX, emptyY, growth));
    }
  }
  return distances;
}

function calcDistance(
  a: Node,
  b: Node,
  emptyLinesX: Set<Number>,
  emptyLinesY: Set<number>,
  growth: number
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  let emptyCrossedX = countCrossed(a.x, dx, emptyLinesX);
  let emptyCrossedY = countCrossed(a.y, dy, emptyLinesY);

  return (
    a.manhattanDistance(b) +
    emptyCrossedX * (growth - 1) +
    emptyCrossedY * (growth - 1)
  );
}

function countCrossed(pos: number, d: number, empty: Set<Number>) {
  let total = 0;
  if (d !== 0) {
    for (let i = 0; i <= Math.abs(d); i++) {
      const val = pos + i * Math.sign(d);
      if (empty.has(val)) {
        total++;
      }
    }
  }
  return total;
}
