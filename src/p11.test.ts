import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p11";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 11", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(11);
      expect(part1(data)).toEqual(374);
    });

    it("input", async () => {
      const data = await readInputForDay(11);
      expect(part1(data)).toEqual(9312968);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(11);
      expect(part2(data, 10)).toEqual(1030);
      expect(part2(data, 100)).toEqual(8410);
    });

    it("input", async () => {
      const data = await readInputForDay(11);
      expect(part2(data)).toEqual(597714117556);
    });
  });
});
