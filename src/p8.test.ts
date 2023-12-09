import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p8";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 8", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(8);
      expect(part1(data)).toEqual(2);
    });

    it("input", async () => {
      const data = await readInputForDay(8);
      expect(part1(data)).toEqual(20777);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(8, 2);
      expect(part2(data)).toEqual(6);
    });

    it("input", async () => {
      const data = await readInputForDay(8);
      expect(part2(data)).toEqual(13289612809129);
    });
  });
});
