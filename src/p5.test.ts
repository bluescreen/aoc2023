import { expect, describe, test as it } from "bun:test";
import { lookup, part1, part2 } from "./p5";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 5", () => {
  describe("part 1", () => {
    it.skip("example", async () => {
      const data = await readInputForDayExample(5);
      expect(part1(data)).toEqual(35);
    });

    it("input", async () => {
      const data = await readInputForDay(5);
      expect(part1(data)).toEqual(0);
    });

    it.skip("should lookup range", () => {
      const range = [
        {
          dest: [50, 52],
          source: [98, 199],
          len: 2,
        },
        {
          dest: [52, 99],
          source: [50, 97],
          len: 48,
        },
      ];

      for (let i = 0; i <= 100; i++) {
        const result = lookup(range, i, "seed-to-soil");

        // console.log(i, result);
      }
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
