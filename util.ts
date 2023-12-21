import path from "path";

export const readInputForDayRaw = async (day: number): Promise<string> => {
  const file = Bun.file(path.resolve(`./inputs/p${day}.txt`));
  return file.text();
};

export const readInputForDayExampleRaw = async (
  day: number,
  example?: number
): Promise<string> => {
  const file = Bun.file(
    path.resolve(`./inputs/p${day}_example${example ? "_" + example : ""}.txt`)
  );
  return await file.text();
};

export const readInputForDay = async (day: number): Promise<string[]> => {
  const file = Bun.file(path.resolve(`./inputs/p${day}.txt`));
  return (await file.text()).split("\n");
};

export const readInputForDayExample = async (
  day: number,
  example?: number
): Promise<string[]> => {
  const file = Bun.file(
    path.resolve(`./inputs/p${day}_example${example ? "_" + example : ""}.txt`)
  );
  return (await file.text()).split("\n");
};

function bold(text: string) {
  return "\033[1m" + text + "\033[0m";
}

export function printGrid(
  grid: (string | number)[][],
  title?: string,
  marked?: Set<string>,
  callback?: (r: number, c: number) => string
) {
  let out = "";
  let height = 1;
  let width = grid[0].length;

  if (title) out += title + "\n";

  for (let i = 1; i <= width; i++) {
    out += "  " + i + " ";
  }
  out += "\n";
  out += "┌─" + "──┬─".repeat(width - 1) + "──┐\n";
  for (let y = 0; y < grid.length; y++) {
    out += "│ ";
    for (let x = 0; x < grid[y].length; x++) {
      const value =
        marked?.has(`${y},${x}`) && callback
          ? bold(callback(y, x))
          : grid[y][x];
      out += value + " │ ";
    }
    out += " " + height + "\n";
    height++;
    if (y < grid.length - 1) {
      out += "├─" + "──┼─".repeat(width - 1) + "──┤\n";
    }
  }
  out += "└─" + "──┴─".repeat(width - 1) + "──┘\n";
  console.log(out);
}
