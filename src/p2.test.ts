import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p2";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 2", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(2);
      expect(part1(data)).toEqual(8);
    });

    it("input", async () => {
      const data = await readInputForDay(2);
      expect(part1(data)).toEqual(2810);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(2);
      expect(part2(data)).toEqual(2286);
    });

    it("input", async () => {
      const data = await readInputForDay(2);
      expect(part2(data)).toEqual(69110);
    });
  });
});
