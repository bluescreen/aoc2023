import { readInputForDay } from "../util";

type Hailstone = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  a: number;
  b: number;
  c: number;
};

type Point = {
  x: number;
  y: number;
};

export const main = async () => {
  const data = await readInputForDay(24);
  console.log("Result part 1", part1(data));

  // Part 2 cannot be run with bun. Need to fallback to Node
  // console.log("Result part 2", part2(data));
};

export const part1 = (input: string[], isExample = false): number => {
  const planeX = isExample ? 7 : 200000000000000;
  const planeY = isExample ? 27 : 400000000000000;
  const hailstones: Hailstone[] = parseHailStones(input);

  return countValidIntersections(hailstones, planeX, planeY);
};

function countValidIntersections(
  hailstones: Hailstone[],
  planeX: number,
  planeY: number
) {
  let total = 0;
  for (let i = 0; i < hailstones.length; i++) {
    const hs1 = hailstones[i];
    for (let j = 0; j < i; j++) {
      const hs2 = hailstones[j];
      const intersection = lineIntersects(hs1, hs2);
      if (
        intersection &&
        isInPlane(intersection.x, intersection.y, planeX, planeY) &&
        intersectsInFuture(hs1, hs2, intersection)
      ) {
        total += 1;
      }
    }
  }
  return total;
}

const lineIntersects = (hs1: Hailstone, hs2: Hailstone) => {
  const { a: a1, b: b1, c: c1 } = hs1;
  const { a: a2, b: b2, c: c2 } = hs2;
  if (a1 * b2 === b1 * a2) {
    return null;
  }
  const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1);
  const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1);
  return { x, y };
};

const intersectsInFuture = (
  hs1: Hailstone,
  hs2: Hailstone,
  intersection: Point
) => {
  return [hs1, hs2].every(
    (hs) =>
      (intersection.x - hs.x) * hs.vx >= 0 &&
      (intersection.y - hs.y) * hs.vy >= 0
  );
};

function parseHailStones(input: string[]): Hailstone[] {
  return input.filter(Boolean).map((line) => {
    const [x, y, z, vx, vy, vz] = line.replace("@", ",").split(",").map(Number);
    const a = vy;
    const b = -vx;
    const c = vy * x - vx * y;
    return { x, y, z, vx, vy, vz, a, b, c };
  });
}

function isInPlane(x: number, y: number, planeX: number, planeY: number) {
  return planeX <= x && x <= planeY && planeX <= y && y <= planeY;
}
