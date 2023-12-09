import { readInputForDay } from "../util";

type Node = { L: string; R: string };
type Graph = Record<string, Node>;
type Direction = "R" | "L";

export const part1 = (input: string[]): number => {
  const directions = input[0].split("");
  const { graph } = buildGraph(input);

  let current = "AAA";
  let steps = 0;
  while (current !== "ZZZ") {
    const nextDir = directions[steps % directions.length] as Direction;
    current = graph[current][nextDir];
    steps++;
  }
  return steps;
};

const calculateGCD = (func: any, a: number, b: number) => {
  return a ? func(func, b % a, a) : b;
};

export const part2 = (input: string[]): number => {
  const directions = input[0].split("");
  const { graph, startNodes } = buildGraph(input);

  return startNodes
    .map((node) => {
      let steps = 0;
      let current: string = node;

      while (!current.endsWith("Z")) {
        const nextDir = directions[steps % directions.length] as Direction;
        current = graph[current][nextDir];
        steps++;
      }
      return steps;
    })
    .reduce(
      (acc: number, steps: number) =>
        (acc * steps) / calculateGCD(calculateGCD, acc, steps)
    );
};

export const main = async () => {
  const data = await readInputForDay(8);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data)); // 13289612809129
};

function buildGraph(input: string[]): { graph: Graph; startNodes: string[] } {
  const graph: Record<string, Node> = {};
  const startNodes = [];

  for (let i = 2; i < input.length; i++) {
    const [index, left, right] = input[i].match(/([1-9A-Z]{3})/g) ?? [];
    graph[index as string] = { L: left, R: right };
    if (index?.endsWith("A")) {
      startNodes.push(index);
    }
  }
  return { graph, startNodes };
}
