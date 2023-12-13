import { readInputForDay } from "../util";

export const main = async () => {
  const data = await readInputForDay(12);

  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

let CACHE: Record<string, number> = {};
type State = { patternPos: number; blockPos: number; length: number };
const DEFAULT_STATE: State = { patternPos: 0, blockPos: 0, length: 0 };
let USE_CACHE = false;

function createStateKey(state: State): string {
  return `${state.patternPos}-${state.blockPos}-${state.length}`;
}

export function calculateArrangements(
  pattern: string,
  blocks: number[],
  state: State = DEFAULT_STATE,
): number {
  const cacheKey: string = createStateKey(state);
  if (cacheKey in CACHE) {
    return CACHE[cacheKey];
  }
  if (state.patternPos === pattern.length) {
    return (state.blockPos === blocks.length && state.length === 0) ||
        (state.blockPos === blocks.length - 1 &&
          blocks[state.blockPos] === state.length)
      ? 1
      : 0;
  }

  const result = [".", "#"].reduce((acc, c) => {
    if (pattern[state.patternPos] === c || pattern[state.patternPos] === "?") {
      acc += calcArrangementsForCharacter(c, state, pattern, blocks);
    }
    return acc;
  }, 0);

  if (USE_CACHE) CACHE[cacheKey] = result;
  return result;
}

function calcArrangementsForCharacter(
  c: string,
  state: State,
  dots: string,
  blocks: number[],
): number {
  const nextState: State = {
    patternPos: state.patternPos + 1,
    blockPos: state.blockPos,
    length: 0,
  };
  const isMatching = state.length > 0 &&
    state.blockPos < blocks.length &&
    blocks[state.blockPos] === state.length;

  if (c === "." && state.length === 0) {
    return calculateArrangements(dots, blocks, nextState);
  } else if (c === "." && isMatching) {
    return calculateArrangements(dots, blocks, {
      ...nextState,
      blockPos: state.blockPos + 1,
    });
  } else if (c === "#") {
    return calculateArrangements(dots, blocks, {
      ...nextState,
      length: state.length + 1,
    });
  } else return 0;
}

export const part1 = (input: string[]): number => {
  USE_CACHE = false;
  return input.reduce((acc, row) => {
    const [pattern, rest] = row.split(" ");
    const counts = rest.split(",").map(Number);
    return acc + calculateArrangements(pattern, counts, DEFAULT_STATE);
  }, 0);
};

export const part2 = (input: string[]): number => {
  USE_CACHE = true;

  return input.reduce((acc, row) => {
    const [pattern, rest] = row.split(" ");

    const pattern2 = [pattern, pattern, pattern, pattern, pattern].join("?");
    const rest2 = [rest, rest, rest, rest, rest].join(",");
    const counts = rest2.split(",").map(Number);
    CACHE = {};
    return acc + calculateArrangements(pattern2, counts, DEFAULT_STATE);
  }, 0);
};
