import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p16";
import {
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 16", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(16);
      expect(part1(data)).toEqual(46);
    });

    it("input", async () => {
      const data = await readInputForDay(16);
      expect(part1(data)).toEqual(7860);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(16);
      expect(part2(data)).toEqual(51);
    });

    it("input", async () => {
      const data = await readInputForDay(16);
      expect(part2(data)).toEqual(8331);
    });
  });
});
