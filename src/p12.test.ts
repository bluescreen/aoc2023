import { expect, describe, test as it } from "bun:test";
import { calculateArrangements, part1, part2 } from "./p12";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 12", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(12);
      expect(part1(data)).toEqual(21);
    });

    it("should calc arrangement", () => {
      expect(calculateArrangements("???.###", [1, 1, 3])).toEqual(1);
    });

    it("input", async () => {
      const data = await readInputForDay(12);
      expect(part1(data)).toEqual(7032);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(12);
      expect(part2(data)).toEqual(525152);
    });

    it("input", async () => {
      const data = await readInputForDay(12);
      expect(part2(data)).toEqual(1493340882140);
    });
  });
});
