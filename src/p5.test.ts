import { expect, describe, test as it } from "bun:test";
import { lookup, part1, part2 } from "./p5";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 5", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(5);
      expect(part1(data)).toEqual(35);
    });

    it("input", async () => {
      const data = await readInputForDay(5);
      expect(part1(data)).toEqual(324724204);
    });

    // it("input", async () => {
    //   const data = await readInputForDay(4);
    //   expect(part1(data)).toEqual(25571);
    // });
  });

  // describe("part 2", () => {
  //   it("example", async () => {
  //     const data = await readInputForDayExample(4);
  //     expect(part2(data)).toEqual(30);
  //   });

  //   it("input", async () => {
  //     const data = await readInputForDay(4);
  //     expect(part2(data)).toEqual(8805731);
  //   });
  // });
});
