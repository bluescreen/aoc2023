import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p5";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 5", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(5);
      expect(part1(data)).toEqual(35);
    });

    it("input", async () => {
      const data = await readInputForDay(5);
      expect(part1(data)).toEqual(324724204);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(5);
      expect(part2(data)).toEqual(46);
    });

    it("input", async () => {
      const data = await readInputForDay(5);
      expect(part2(data)).toEqual(114257961);
    });
  });
});
