import { readInputForDayExample } from "../util";

export const main = async () => {
  const data = await readInputForDayExample(25);
  console.log("Result part 1", part1(data));
};

export const part1 = (input: string[]) => {
  const { vertices, edges } = buildGraph(input);
  let subsets: string[][] = [];
  let subset1: string[], subset2: string[];

  do {
    subsets = [];

    for (const vertex of vertices) {
      subsets.push([vertex]);
    }

    while (subsets.length > 2) {
      const randIndex = Math.floor(Math.random() * edges.length);

      subset1 = subsets.find((s) => s.includes(edges[randIndex][0])) || [];
      subset2 = subsets.find((s) => s.includes(edges[randIndex][1])) || [];

      if (subset1 === subset2) continue;

      subsets = subsets.filter((s) => s !== subset2);
      subset1.push(...subset2);
    }
  } while (countCuts(subsets, edges) !== 3);

  return subsets.reduce((a, b) => a * b.length, 1);
};

function buildGraph(input: string[]) {
  const vertices: string[] = [];
  const edges: string[][] = [];

  const addToVertices = (vertex: string) => {
    !vertices.includes(vertex) && vertices.push(vertex);
  };

  input.forEach((line) => {
    const [component, connectedStr] = line.split(": ");
    const connected = connectedStr.split(" ");

    addToVertices(component);
    connected.forEach((c) => addToVertices(c));

    connected.forEach(
      (c) => !hasEdge(component, c) && edges.push([component, c])
    );
  });

  function hasEdge(vertex1: string, vertex2: string) {
    return edges.some(
      (e) =>
        (e[0] === vertex1 && e[1] === vertex2) ||
        (e[0] === vertex2 && e[1] === vertex1)
    );
  }

  return { vertices, edges };
}

function countCuts(subsets: string[][], edges: string[][]): number {
  let cuts = 0;

  for (let i = 0; i < edges.length; ++i) {
    const subset1 = subsets.find((s) => s.includes(edges[i][0])) || [];
    const subset2 = subsets.find((s) => s.includes(edges[i][1])) || [];

    if (subset1 !== subset2) ++cuts;
  }

  return cuts;
}
