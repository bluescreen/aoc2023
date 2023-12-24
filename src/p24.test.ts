import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p24";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 24", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(24);
      expect(await part1(data, true)).toEqual(2);
    });

    it("input", async () => {
      const data = await readInputForDay(24);
      expect(await part1(data)).toEqual(20434);
    });
  });
});
