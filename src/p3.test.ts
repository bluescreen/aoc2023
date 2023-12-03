import { expect, describe, test as it } from "bun:test";
import { part1 } from "./p3.ts";
import { readInputForDayExample } from "../util";

describe("day 3", () => {
  it("part 1 example", async () => {
    const data = await readInputForDayExample(3);
    expect(part1(data)).toEqual(0);
  });

  // it("part 1 example", async () => {
  //   const data = await readInputForDay(2);
  //   expect(part1(data)).toEqual(2810);
  // });

  // it("part 2 example", async () => {
  //   const data = await readInputForDayExample(2);
  //   expect(part2(data)).toEqual(2286);
  // });

  // it("part 2 example", async () => {
  //   const data = await readInputForDay(2);
  //   expect(part2(data)).toEqual(69110);
  // });
});
