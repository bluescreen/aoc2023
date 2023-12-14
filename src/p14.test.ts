import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p14";
import {
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 14", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(14);
      expect(part1(data)).toEqual(136);
    });

    it("input", async () => {
      const data = await readInputForDay(14);
      expect(part1(data)).toEqual(108792);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(14);
      expect(part2(data)).toEqual(64);
    });

    it("input", async () => {
      const data = await readInputForDay(14);
      expect(part2(data)).toEqual(99118);
    });
  });
});
