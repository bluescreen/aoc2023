import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p18";
import {
  printGrid,
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 18", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(18);
      expect(part1(data)).toEqual(62);
    });

    it("input", async () => {
      const data = await readInputForDay(18);
      expect(part1(data)).toEqual(53844);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(18);
      expect(part2(data)).toEqual(952408144115);
    });

    it("input", async () => {
      const data = await readInputForDay(18);
      expect(part2(data)).toEqual(42708339569950);
    });
  });
});
