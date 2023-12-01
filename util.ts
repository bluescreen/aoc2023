import path from "path";

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
