import { expect, describe, test as it } from "bun:test";
import { dijkstra, part1, part2 } from "./p17";
import {
  printGrid,
  readInputForDay,
  readInputForDayExample,
  readInputForDayExampleRaw,
  readInputForDayRaw,
} from "../util";

describe("day 17", () => {
  it("should run djkstra", () => {
    const grid = [
      [1, 1, 2, 2],
      [2, 1, 2, 2],
      [2, 1, 1, 1],
      [2, 2, 2, 1],
    ];
    const defaultNode = { r: 0, c: 0, dist: 0, dr: 0, dc: 0, indir: 0 };
    const { distance, path } = dijkstra(grid, defaultNode, {
      ...defaultNode,
      r: grid.length - 1,
      c: grid[0].length - 1,
    });
    expect(distance).toEqual(6);
  });

  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(17);
      expect(part1(data)).toEqual(102);
    });

    it("input", async () => {
      const data = await readInputForDay(17);
      expect(part1(data)).toEqual(845);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(17);
      expect(part2(data)).toEqual(94);
    });

    it("input", async () => {
      const data = await readInputForDay(17);
      expect(part2(data)).toEqual(993);
    });
  });
});
