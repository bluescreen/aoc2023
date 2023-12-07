import { readInputForDay } from "../util";

type Color = "red" | "blue" | "green";
type ColorSet = Record<Color, number>;

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const toColorSet = (set: string): ColorSet => {
  const matches = set.match(/(\d+ (red|green|blue))/g) as string[];
  return matches
    ?.map((set) => set.split(" "))
    .reduce((acc: any, [num, color]) => {
      if (!acc[color]) {
        acc[color] = 0;
      }
      acc[color] += parseInt(num);
      return acc;
    }, {}) as ColorSet;
};

export const part1 = (input: string[]) => {
  return input.reduce((acc, row) => {
    const gameMatch = row.match(/^Game (\d+):(.*)/);
    const game: number = parseInt(gameMatch?.at(1) ?? "");
    const body = gameMatch?.at(2);

    const failedGames =
      body?.split(";")?.filter((set: any) => {
        const colors = toColorSet(set);
        return (
          colors["red"] > MAX_RED ||
          colors["green"] > MAX_GREEN ||
          colors["blue"] > MAX_BLUE
        );
      }) ?? [];
    return (acc += failedGames.length === 0 ? game : 0);
  }, 0);
};

export const part2 = (input: string[]): number => {
  return input.reduce((acc, row) => {
    const gameMatch = row.match(/^Game (\d+):(.*)/);
    const body = gameMatch?.at(2);
    const sets: string[] = body?.split(";") ?? [];

    const maxColors: ColorSet = sets.reduce(
      (maxValues: ColorSet, set: string) => {
        const { red, green, blue } = toColorSet(set);

        return {
          red: Math.max(red ?? 0, maxValues.red),
          green: Math.max(green ?? 0, maxValues.green),
          blue: Math.max(blue ?? 0, maxValues.blue),
        };
      },
      { red: 0, green: 0, blue: 0 } as ColorSet
    );
    return acc + maxColors.red * maxColors.blue * maxColors.green;
  }, 0);
};

export const main = async () => {
  const data = await readInputForDay(2);
  console.log("Result part 1", part1(data));
  console.log("Result part 1", part2(data));
};
