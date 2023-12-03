import { expect, describe, test as it } from "bun:test";
import {
  isNumberAdjacentToCoord,
  checkAdjacentforSymbols,
  part1,
  part2,
} from "./p3.ts";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 3", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(3);
      expect(part1(data)).toEqual(4361);
    });

    it("input", async () => {
      const data = await readInputForDay(3);
      expect(part1(data)).toEqual(535351);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(3);
      expect(part2(data)).toEqual(467835);
    });

    it("input", async () => {
      const data = await readInputForDay(3);
      expect(part2(data)).toEqual(87287096);
    });
  });

  describe("check adjacent", () => {
    it("should check if number is adjacent to number", () => {
      const checkObj = {
        y: 0,
        x: [0, 1, 2],
        n: 467,
      };

      const coordinates = { x: 3, y: 1 };
      expect(isNumberAdjacentToCoord(checkObj, coordinates)).toEqual(true);
    });

    it("should check if symbol is adjacent to number", () => {
      const set: string[][] = [
        [".", ".", "."],
        [".", "1", "."],
        [".", ".", "*"],
      ];

      expect(checkAdjacentforSymbols(set, { x: 1, y: 1 })).toEqual(true);
    });

    it("should check if symbol is adjacent to number in corner", () => {
      const set = [
        ["1", "."],
        [".", "#"],
      ];

      expect(checkAdjacentforSymbols(set, { x: 0, y: 0 })).toEqual(true);

      const set2 = [
        [".", "*"],
        [".", "1"],
      ];

      expect(checkAdjacentforSymbols(set2, { x: 1, y: 1 })).toEqual(true);
    });
  });
});
