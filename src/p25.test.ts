import { expect, describe, test as it } from "bun:test";
import { part1 } from "./p25";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 25", () => {
  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(25);
      expect(await part1(data)).toEqual(54);
    });

    it.skip("input TODO: find deterministic algo", async () => {
      const data = await readInputForDay(25);
      expect(await part1(data)).toEqual(583338);
    });
  });
});
