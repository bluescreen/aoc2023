import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p6";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 6", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(6);
      expect(part1(data)).toEqual(288);
    });

    it("input", async () => {
      const data = await readInputForDay(6);
      expect(part1(data)).toEqual(3316275);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(6);
      expect(part2(data)).toEqual(71503);
    });

    it("input", async () => {
      const data = await readInputForDay(6);
      expect(part2(data)).toEqual(27102791);
    });
  });
});
