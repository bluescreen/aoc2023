import { expect, describe, test as it } from "bun:test";
import { part1, part2 } from "./p21";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 21", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(21);
      expect(part1(data, 6)).toEqual(16);
    });

    it("input", async () => {
      const data = await readInputForDay(21);
      expect(part1(data, 64)).toEqual(3743);
    });
  });

  describe("part 2", () => {
    it("input", async () => {
      const data = await readInputForDay(21);
      expect(part2(data)).toEqual(618261433219147);
    });
  });
});
