import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p15";
import { readInputForDayExampleRaw, readInputForDayRaw } from "../util";

describe("day 15", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(15);
      expect(part1(data)).toEqual(1320);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(15);
      expect(part1(data)).toEqual(516804);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExampleRaw(15);
      expect(part2(data)).toEqual(145);
    });

    it("input", async () => {
      const data = await readInputForDayRaw(15);
      expect(part2(data)).toEqual(231844);
    });
  });
});
