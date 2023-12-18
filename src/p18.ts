import { readInputForDay } from "../util";

type Node = { x: number; y: number };

export const main = async () => {
  const data = await readInputForDay(18);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

const dirs: { [key: string]: [number, number] } = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

export const part1 = (input: string[]): number => {
  const points: Node[] = [{ x: 0, y: 0 }];

  let outerPoints = 0;
  for (let row of input) {
    let [dir, numStr] = row.split(" ");
    const [dr, dc] = dirs[dir];
    const num: number = parseInt(numStr, 10);
    const { x: r, y: c } = points[points.length - 1];
    points.push({ x: r + dr * num, y: c + dc * num });
    outerPoints += num;
  }

  const area = shoelace(points);
  const innerPoints = area - outerPoints / 2 + 1;
  return innerPoints + outerPoints;
};

export const part2 = (input: string[]): number => {
  const points: Node[] = [{ x: 0, y: 0 }];

  let outerPoints = 0;
  for (let row of input) {
    let [_1, _2, x] = row.split(" ");
    const t = x.slice(2, -1);
    const n = parseInt(t.slice(0, -1), 16);
    const last = parseInt(t[t.length - 1]);
    const dir = ["R", "D", "L", "U"][last];

    const [dr, dc] = dirs[dir];
    const { x: r, y: c } = points[points.length - 1];
    points.push({ x: r + dr * n, y: c + dc * n });
    outerPoints += n;
  }

  const area = shoelace(points);
  const innerPoints = area - outerPoints / 2 + 1;
  return innerPoints + outerPoints;
};

function shoelace(points: Node[]): number {
  return Math.abs(
    Math.floor(
      points.reduce(
        (acc, _, i, v) =>
          acc +
          (v[(i - 1 + v.length) % v.length].x * v[i].y -
            v[i].x * v[(i - 1 + v.length) % v.length].y),
        0
      ) / 2
    )
  );
}
