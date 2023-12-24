//import { readInputForDay, readInputForDayExample } from "../util";
import assert from "assert";
import { init } from "z3-solver";
import fs from "fs";
import path from "path";

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
  const data = fs
    .readFileSync(path.resolve("../inputs/p24.txt"), "utf-8")
    .split("\n");
  console.log("Result part 2", await part2(data));
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

export const part2 = async (input: string[]): Promise<number> => {
  const hailstones: Hailstone[] = parseHailStones(input);
  console.log(hailstones);

  const { Context } = await init();
  const { Real, Solver } = Context("main");

  const xr = Real.const("x");
  const yr = Real.const("y");
  const zr = Real.const("z");

  const vxr = Real.const("vx");
  const vyr = Real.const("vy");
  const vzr = Real.const("vz");

  const solver = new Solver();

  for (const [index, hs] of hailstones.slice(0, 3).entries()) {
    const t = Real.const(`t${index}`);

    solver.add(t.ge(0));
    solver.add(xr.add(vxr.mul(t)).eq(t.mul(hs.vx).add(hs.x)));
    solver.add(yr.add(vyr.mul(t)).eq(t.mul(hs.vy).add(hs.y)));
    solver.add(zr.add(vzr.mul(t)).eq(t.mul(hs.vz).add(hs.z)));
  }

  const satisfied = await solver.check();

  assert(satisfied === "sat", "Z3 solver unsatisfied");

  const model = solver.model();

  return [model.eval(xr), model.eval(yr), model.eval(zr)]
    .map(Number)
    .reduce((a, b) => a + b);
};
