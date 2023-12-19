import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p19";
import {
  printGrid,
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 19", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(19);
      expect(part1(data)).toEqual(19114);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(19);
      expect(part1(data)).toEqual(489392);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(19);
      expect(part2(data)).toEqual(0);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(19);
      expect(part2(data)).toEqual(0);
    });
  });
});
