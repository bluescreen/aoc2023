import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p4";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 4", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(4);
      expect(part1(data)).toEqual(13);
    });

    it("input", async () => {
      const data = await readInputForDay(4);
      expect(part1(data)).toEqual(25571);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(4);
      expect(part2(data)).toEqual(30);
    });

    it("input", async () => {
      const data = await readInputForDay(4);
      expect(part2(data)).toEqual(8805731);
    });
  });
});
