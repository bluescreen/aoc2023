import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p2";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 2", () => {
  it("part 1 example", async () => {
    const data = await readInputForDayExample(2);
    expect(part1(data)).toEqual(8);
  });

  it("part 1 example", async () => {
    const data = await readInputForDay(2);
    expect(part1(data)).toEqual(2810);
  });

  it("part 2 example", async () => {
    const data = await readInputForDayExample(2);
    expect(part2(data)).toEqual(2286);
  });

  it("part 2 example", async () => {
    const data = await readInputForDay(2);
    expect(part2(data)).toEqual(69110);
  });
});
