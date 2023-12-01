import { expect, test as it } from "bun:test";
import { part1, part2 } from "./p1";
import { readInputForDay, readInputForDayExample } from "../util";

it("should run day 1 - part 1 example", async () => {
  const data = await readInputForDayExample(1);
  expect(part1(data)).toEqual(142);
});

it("should run day 1 - part 1 input", async () => {
  const data = await readInputForDay(1);
  expect(part1(data)).toEqual(54667);
});

it("should run day 1 - part 1 example", async () => {
  const data = await readInputForDayExample(1, 2);
  expect(part2(data)).toEqual(281);
});

it.only("should run day 1 part 2", async () => {
  const data = await readInputForDay(1);
  expect(part2(data)).toEqual(54203);
});
