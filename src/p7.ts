import { readInputForDay } from "../util";

export enum HandType {
  FIVE_OF_KIND = 1,
  FOUR_OF_A_KIND = 2,
  FULL_HOUSE = 3,
  THREE_OF_A_KIND = 4,
  TWO_PAIR = 5,
  ONE_PAIR = 6,
  HIGHEST_CARD = 7,
}

type Hand = {
  type: HandType;
  order: number[];
};

type CardCount = { [key: string]: number };

export const part1 = (input: string[]): number => {
  const ORDER_PART1 = "AKQJT98765432".split("");

  return input
    .map((row) => {
      const [hand, bid] = row.split(" ");
      return { ...parseHand(hand, ORDER_PART1), bid: parseInt(bid) };
    })
    .sort(compareHands)
    .reduce((acc, hand, index) => acc + (index + 1) * hand.bid, 0);
};

export const part2 = (input: string[]): number => {
  const ORDER_PART2 = "AKQT98765432J".split("");

  return input
    .map((row) => {
      const [hand, bid] = row.split(" ");
      return { ...parseHand(hand, ORDER_PART2, true), bid: parseInt(bid) };
    })
    .sort(compareHands)
    .reduce((acc, hand, index) => acc + (index + 1) * hand.bid, 0);
};

const mostCommonCard = (counts: CardCount, pos = 1): [string, number][] => {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, pos);
};

const countCards = (hand: string[]): CardCount => {
  return hand.reduce((acc: CardCount, char: string) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
};

export const compareHands = (a: Hand, b: Hand) => {
  if (a.type !== b.type) {
    return b.type - a.type;
  }
  const index = a.order.findIndex((_, i) => a.order[i] !== b.order[i]);
  return index !== -1 ? b.order[index] - a.order[index] : 0;
};

export function parseHand(
  s: string,
  sortOrder: string[],
  withJoker = false
): Hand {
  const hand = s.split("");
  const numJokers = hand.filter((c) => c === "J").length;
  const counts = countCards(hand);

  if (withJoker && numJokers > 0 && numJokers < 5) {
    if (counts["J"]) delete counts.J; // Remove Jokers
    const [[c]] = mostCommonCard(counts, 1);
    counts[c] += numJokers; // Add Jokers to mst common card
  }

  const order = Array.from(hand, (card) => sortOrder.indexOf(card));
  const type = matchRules(mostCommonCard(counts, 2));
  return { type, order };
}

const matchRules = (common: [string, number][]): HandType => {
  if (common[0][1] === 5) {
    return HandType.FIVE_OF_KIND;
  } else if (common[0][1] === 4) {
    return HandType.FOUR_OF_A_KIND;
  } else if (common[0][1] === 3 && common[1][1] === 2) {
    return HandType.FULL_HOUSE;
  } else if (common[0][1] === 3) {
    return HandType.THREE_OF_A_KIND;
  } else if (common[0][1] === 2 && common[1][1] === 2) {
    return HandType.TWO_PAIR;
  } else if (common[0][1] === 2) {
    return HandType.ONE_PAIR;
  }
  return HandType.HIGHEST_CARD;
};

export const main = async () => {
  const data = await readInputForDay(7);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};
