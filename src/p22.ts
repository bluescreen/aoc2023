import { readInputForDay, readInputForDayExample } from "../util";
import Deque from "./deque";

const WRITE_DATA = true;
const NUM_BRICKS = 20000;

export const main = async () => {
  const data = await readInputForDay(22);
  console.log("Result part 1", await part1(data.slice(0, NUM_BRICKS)));
  console.log("Result part 2", await part2(data.slice(0, NUM_BRICKS)));
};

type Brick = {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  color?: number;
};

function brickToString(brick: Brick): string {
  return `[[${brick.x1}, ${brick.y1}, ${brick.z1}],[${brick.x2}, ${brick.y2}, ${brick.z2}], ${brick.color}]`;
}

function collides(a: Brick, b: Brick): boolean {
  return (
    Math.max(a.x1, b.x1) <= Math.min(a.x2, b.x2) &&
    Math.max(a.y1, b.y1) <= Math.min(a.y2, b.y2)
  );
}

export async function part1(input: string[]) {
  const bricks: Brick[] = parseBricks(input);
  letBricksFall(bricks);

  const {
    k_supports_v,
    v_supports_k,
  }: {
    k_supports_v: Record<number, number[]>;
    v_supports_k: Record<number, number[]>;
  } = checkBricksSupportedByLower(bricks);

  const total = findRemovableBricks(bricks, k_supports_v, v_supports_k);
  if (WRITE_DATA) await writeDataFile(bricks);
  return total;
}

export async function part2(input: string[]) {
  const bricks: Brick[] = parseBricks(input);
  letBricksFall(bricks);

  const {
    k_supports_v,
    v_supports_k,
  }: {
    k_supports_v: Record<number, number[]>;
    v_supports_k: Record<number, number[]>;
  } = checkBricksSupportedByLower(bricks);

  let total = findChainReaction(bricks, k_supports_v, v_supports_k);

  await writeDataFile(bricks);
  return total;
}

function findChainReaction(
  bricks: Brick[],
  k_supports_v: Record<number, number[]>,
  v_supports_k: Record<number, number[]>
) {
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    const q: Deque<number> = new Deque([]);
    const items = [];
    for (const j of k_supports_v[i]) {
      if (v_supports_k[j].length === 1) {
        q.append(j);
        items.push(j);
      }
    }

    const falling = new Set(items);
    falling.add(i);

    while (!q.isEmpty()) {
      const j = q.popLeft()!;
      for (const k of k_supports_v[j]) {
        if (!falling.has(k) && v_supports_k[k].length <= falling.size) {
          q.append(k);
          falling.add(k);
        }
      }
    }
    total += falling.size - 1;
  }
  return total;
}

function parseBricks(input: string[]) {
  const bricks: Brick[] = [];
  for (let row of input) {
    const b = row.replace("~", ",").split(",").map(Number);
    bricks.push({ x1: b[0], y1: b[1], z1: b[2], x2: b[3], y2: b[4], z2: b[5] });
  }
  bricks.sort((a, b) => a.z1 - b.z1);
  return bricks;
}

function findRemovableBricks(
  bricks: Brick[],
  k_supports_v: Record<number, number[]>,
  v_supports_k: Record<number, number[]>
) {
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (k_supports_v[i].every((j) => v_supports_k[j]?.length >= 2)) {
      bricks[i].color = 1;
      total++;
    } else {
      bricks[i].color = 0;
    }
  }
  return total;
}

function letBricksFall(bricks: Brick[]) {
  for (let index = 0; index < bricks.length; index++) {
    const current = bricks[index];
    let maxZ = 1;
    const bricksCheck = bricks.slice(0, index);
    for (let check of bricksCheck) {
      if (collides(current, check)) {
        maxZ = Math.max(maxZ, check.z2 + 1);
      }
    }
    current.z2 -= current.z1 - maxZ;
    current.z1 = maxZ;
  }
  bricks.sort((a, b) => a.z1 - b.z1);
}

function checkBricksSupportedByLower(bricks: Brick[]) {
  let k_supports_v: Record<number, number[]> = {};
  let v_supports_k: Record<number, number[]> = {};

  for (let i = 0; i < bricks.length; i++) {
    k_supports_v[i] = [];
    v_supports_k[i] = [];
  }

  for (let j = 0; j < bricks.length; j++) {
    const upper = bricks[j];

    for (let i = 0; i <= j; i++) {
      const lower = bricks[i];

      if (collides(lower, upper) && upper.z1 === lower.z2 + 1) {
        k_supports_v[i].push(j);
        v_supports_k[j].push(i);
      }
    }
  }
  return { k_supports_v, v_supports_k };
}

async function writeDataFile(bricks: Brick[]) {
  const coords =
    "[" +
    bricks
      .map((b) => brickToString(b))
      .join(",\n")
      .replace(/,\s*$/, "") +
    "]";
  await Bun.write("./viewer/data.json", coords);
}
