import { readInputForDayRaw } from "../util";

export const main = async () => {
  const data = await readInputForDayRaw(15);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

function hash(string: string) {
  return string.split("").reduce(function (acc: number, char: string) {
    return ((acc + char.charCodeAt(0)) * 17) % 256;
  }, 0);
}

export const part1 = (input: string): number => {
  return input
    .split(",")
    .map(hash)
    .reduce((a, b) => a + b);
};

export const part2 = (input: string): number => {
  const { boxes, focalLengths } = parseInput(input);
  return boxes.reduce((acc, box, boxIndex) => {
    return (
      acc +
      box.reduce((acc, label, lens) => {
        return acc + (boxIndex + 1) * (lens + 1) * focalLengths[label];
      }, 0)
    );
  }, 0);
};

function parseInput(input: string) {
  const boxes: string[][] = Array.from({ length: 256 }, () => []);
  const focalLengths: Record<string, number> = {};

  input.split(",").forEach((instruction) => {
    if (instruction.includes("-")) {
      const label = instruction.slice(0, -1);
      const index = hash(label);
      boxes[index] = boxes[index]?.filter((item) => item !== label) || [];
    } else {
      const [label, lengthStr] = instruction.split("=");
      const length = parseInt(lengthStr, 10);
      const index = hash(label);
      if (!boxes[index]?.includes(label)) boxes[index]?.push(label);
      focalLengths[label] = length;
    }
  });
  return { boxes, focalLengths };
}
