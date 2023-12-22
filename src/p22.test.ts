import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p22";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 22", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(22);
      expect(await part1(data)).toEqual(5);
    });

    it("input", async () => {
      const data = await readInputForDay(22);
      expect(await part1(data)).toEqual(471);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(22);
      expect(part2(data)).toEqual(0);
    });

    it.skip("input", async () => {
      const data = await readInputForDay(22);
      expect(part2(data)).toEqual(0);
    });
  });
});
