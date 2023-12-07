import { expect, describe, test as it } from "bun:test";
import { HandType, compareHands, parseHand, part1, part2 } from "./p7";
import { readInputForDay, readInputForDayExample } from "../util";

describe("day 7", () => {
  describe("Parse", () => {
    const ORDER_PART1 = "AKQJT98765432".split("");
    const ORDER_PART2 = "AKQT98765432J".split("");

    const hand = (h: string) => parseHand(h, ORDER_PART1);
    const hand2 = (h: string) => parseHand(h, ORDER_PART2, true);

    it("should parse hand", () => {
      expect(hand("QQQQQ").type).toEqual(HandType.FIVE_OF_KIND);
      expect(hand("QQQQ2").type).toEqual(HandType.FOUR_OF_A_KIND);
      expect(hand("QQQ32").type).toEqual(HandType.THREE_OF_A_KIND);
      expect(hand("QQ332").type).toEqual(HandType.TWO_PAIR);
      expect(hand("QQ432").type).toEqual(HandType.ONE_PAIR);
      expect(hand("Q5432").type).toEqual(HandType.HIGHEST_CARD);
      expect(hand("QQQAA").type).toEqual(HandType.FULL_HOUSE);
    });

    it("should parse hand with joker", () => {
      expect(hand2("JKKK2").type).toEqual(HandType.FOUR_OF_A_KIND);
      expect(hand2("QQQQ2").type).toEqual(HandType.FOUR_OF_A_KIND);
    });

    it("should compare hands", () => {
      const testCards = ["JKKK2", "QQQQ2"]
        .map((m) => hand2(m))
        .sort(compareHands);
    });
  });

  describe("part 1", () => {
    it("example", async () => {
      const data = await readInputForDayExample(7);
      expect(part1(data)).toEqual(6440);
    });

    it("input", async () => {
      const data = await readInputForDay(7);
      expect(part1(data)).toEqual(248836197);
    });
  });

  describe("part 2", () => {
    it("example", async () => {
      const data = await readInputForDayExample(7);
      expect(part2(data)).toEqual(5905);
    });

    it("input", async () => {
      const data = await readInputForDay(7);
      expect(part2(data)).toEqual(251195607);
    });
  });
});
