import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p20";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 20", () => {
  describe("part 1", () => {
    it("example 1", async () => {
      const data = await readInputForDayExample(20);
      expect(part1(data)).toEqual(32000000);
    });

    it("example 2", async () => {
      const data = await readInputForDayExample(20, 2);
      expect(part1(data)).toEqual(11687500);
    });

    it("input", async () => {
      const data = await readInputForDay(20);
      expect(part1(data)).toEqual(739960225);
    });
  });

  describe.skip("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(20);
      expect(part2(data)).toEqual(0);
    });

    it.skip("input", async () => {
      const data = await readInputForDay(20);
      expect(part2(data)).toEqual(0);
    });
  });
});
