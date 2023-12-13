import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p13";
import {
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 13", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(13);
      expect(part1(data)).toEqual(405);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(13);
      expect(part1(data)).toEqual(34993);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(13);
      expect(part2(data)).toEqual(400);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(13);
      expect(part2(data)).toEqual(29341);
    });
  });
});
