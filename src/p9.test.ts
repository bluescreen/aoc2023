import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p9";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 9", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(9);
      expect(part1(data)).toEqual(114);
    });

    it("input", async () => {
      const data = await readInputForDay(9);
      expect(part1(data)).toEqual(1868368343);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(9);
      expect(part2(data)).toEqual(2);
    });

    it("input", async () => {
      const data = await readInputForDay(9);
      expect(part2(data)).toEqual(1022);
    });
  });
});
