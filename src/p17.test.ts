import { expect, describe, test as it } from "bun:test";
import { djkstra, part1, part2 } from "./p17";
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

    const { distance, path } = djkstra(
      grid,
      { r: 0, c: 0, dist: 0 },
      { r: grid.length - 1, c: grid[0].length - 1, dist: 0 }
    );

    printGrid(grid, "Test", path);
    expect(distance).toEqual(6);
  });

  describe.skip("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(17);
      expect(part1(data)).toEqual(0);
    });

    it("input", async () => {
      const data = await readInputForDay(17);
      expect(part1(data)).toEqual(0);
    });
  });

  describe.skip("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(17);
      expect(part2(data)).toEqual(0);
    });

    it("input", async () => {
      const data = await readInputForDay(17);
      expect(part2(data)).toEqual(0);
    });
  });
});
