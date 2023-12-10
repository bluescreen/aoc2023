import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p10";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 10", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(10);
      expect(part1(data)).toEqual(8);
    });

    it("input", async () => {
      const data = await readInputForDay(10);
      expect(part1(data)).toEqual(6907);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(10, 2);
      expect(part2(data)).toEqual(4);
    });

    it("input", async () => {
      const data = await readInputForDay(10);
      expect(part2(data)).toEqual(541);
    });
  });
});
