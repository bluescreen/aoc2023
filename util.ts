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

export function printGrid(grid: string[][]) {
  let out = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      out += grid[y][x];
    }
    out += "\n";
  }
  console.log(out);
}
