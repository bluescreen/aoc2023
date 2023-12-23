import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p23";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 23", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(23);
      expect(await part1(data)).toEqual(0);
    });

    it("input", async () => {
      const data = await readInputForDay(23);
      expect(await part1(data)).toEqual(0);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(23);
      expect(await part2(data)).toEqual(0);
    });

    it("input", async () => {
      const data = await readInputForDay(23);
      expect(await part2(data)).toEqual(0);
    });
  });
});
