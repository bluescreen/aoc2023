import { readInputForDay, readInputForDayExample } from "../util.ts";

const isNumber = (symbol?: string) => {
  return symbol && symbol.match(/[0-9]/);
};

type Number = { n: number; y: number; x: number[] };

type Coord = {
  x: number;
  y: number;
};

const isSymbol = (char: string) => {
  return !isNumber(char) && char !== ".";
};

export const checkAdjacentforSymbols = (matrix: string[], c: Coord) => {
  const adjacentPositions = [
    [c.y - 1, c.x],
    [c.y + 1, c.x],
    [c.y, c.x - 1],
    [c.y, c.x + 1],
    [c.y - 1, c.x - 1],
    [c.y - 1, c.x + 1],
    [c.y + 1, c.x - 1],
    [c.y + 1, c.x + 1],
  ];
  return adjacentPositions.some(([y, x]) =>
    matrix.at(y)?.at(x) ? isSymbol(matrix.at(y)?.at(x) as string) : false
  );
};

export const part1 = (input: string[]): number => {
  const numberCoords: string[] = [];
  let numIndex = 0;
  let numberStr = "";
  let isAdjacent = [];

  for (let y in input) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y][x];
      const charNext = x + 1 < input[y].length ? input[y][x + 1] : "\n";

      if (isNumber(char)) {
        const coord = { x, y: parseInt(y) };
        numberStr += char;
        isAdjacent.push(checkAdjacentforSymbols(input, coord));

        if (charNext && !isNumber(charNext)) {
          if (isAdjacent.some((p) => p)) {
            numberCoords.push(numberStr);
          }
          numIndex++;
          isAdjacent = [];
          numberStr = "";
        }
      }
    }
  }

  return numberCoords
    .filter((n) => n)
    .reduce((acc: number, numString: string) => acc + parseInt(numString), 0);
};

export const part2 = (input: string[]): number => {
  const numberCoords: Number[] = [];
  let numIndex = 0;
  const stars: Coord[] = [];

  let numbers = [];
  let numberXCoords: number[] = [];

  for (let y in input) {
    for (let x = 0; x < input[y].length; x++) {
      const char = input[y][x];
      const charNext = x + 1 < input[y].length ? input[y][x + 1] : "\n";
      const coord = { x, y: parseInt(y) };

      if (char == "*") {
        stars.push(coord);
      }

      if (isNumber(char)) {
        numberXCoords.push(x);
        numbers.push(char);

        if (charNext && !isNumber(charNext)) {
          numberCoords.push({
            y: coord.y,
            x: numberXCoords,
            n: parseInt(numbers.join("")),
          });

          numberXCoords = [];
          numbers = [];
        }
      }
    }
  }

  let adjacentNums: Number[] = [];
  const ratios: number[] = [];
  for (let star of stars) {
    for (let num of numberCoords) {
      if (isNumberAdjacentToCoord(num, star)) {
        adjacentNums.push(num);
      }
    }
    if (adjacentNums.length === 2) {
      ratios.push(adjacentNums[0].n * adjacentNums[1].n);
    }
    adjacentNums = [];
  }

  return ratios.reduce((acc, ratio) => acc + ratio, 0);
};

export function isNumberAdjacentToCoord(
  { y, x: spanX }: Number,
  { x: x1, y: y1 }: Coord
) {
  return spanX.some((x) => areCoordinatesAdjacent([x1, y1], [x, y]));
}

function areCoordinatesAdjacent([x1, y1]: number[], [x2, y2]: number[]) {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return (
    (dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)
  );
}

const data = await readInputForDay(3);
console.log("Result part 1", part1(data));
console.log("Result part 2", part2(data));
