import { readInputForDayRaw } from "../util";

type Entry = { x: number; m: number; a: number; s: number };
type RulesMap = Map<string, Function>;
type Range = [number, number];

type Workflow = { key: string; compare: string; n: number; target: string };
type Workflows = {
  [key: string]: [Workflow[], fallback: string];
};

export const main = async () => {
  const data = await readInputForDayRaw(19);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export function part1(input: string) {
  const [rules, entries] = input.split("\n\n");
  const funcs = extractRuleFuncs(rules);

  return entries.split("\n").reduce((acc, l) => {
    const p: Entry = (0, eval)(
      `(() => { return ${l.replaceAll(/=/g, ":")} })()`
    );
    const accepted = funcs.get("in")!(funcs, p);
    const sum = accepted ? p.x + p.m + p.a + p.s : 0;
    return acc + sum;
  }, 0);
}

export function part2(input: string) {
  const [rules, entries] = input.split("\n\n");
  let workflows: Workflows;

  workflows = rules.split("\n").reduce((acc: Workflows, line) => {
    const [name, rest] = line.slice(0, -1).split("{");
    const rules = rest.split(",");

    acc[name] = [[], rules.pop() as any];

    for (const rule of rules) {
      const [comparison, target] = rule.split(":");
      const key = comparison[0];
      const cmp = comparison[1];
      const n = parseInt(comparison.slice(2));
      if (!acc[name][0]) {
        acc[name][0] = [];
      }

      acc[name][0].push({ key, compare: cmp, n, target });
    }
    return acc;
  }, {});

  return countAccepted(workflows, {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  });
}

function extractRuleFuncs(rules: string): RulesMap {
  const map: RulesMap = new Map(
    rules.split("\n").map((l) => {
      const [action, rules] = l.split("{");
      const callback = new Function(
        "fn",
        "p",
        rules
          .slice(0, -1)
          .split(",")
          .map((part) => {
            const rule = part.split(":");
            const label = rule.pop();
            const condition = rule.pop();
            return accept(condition, label);
          })
          .join(";")
      );
      return [action, callback];
    })
  );
  return map;
}

function accept(
  condition: string | undefined,
  label: string | undefined
): string {
  return `${condition ? `if(p.${condition})` : ""} return ${
    label === "A"
      ? "true"
      : label === "R"
      ? "false"
      : `fn.get("${label}")(fn,p)`
  }`;
}

function countAccepted(
  workflows: Workflows,
  ranges: { [key: string]: Range },
  label: string = "in"
): number {
  if (label === "R") {
    return 0;
  }
  if (label === "A") {
    return Object.values(ranges).reduce(
      (product, [low, high]: Range) => product * (high - low + 1),
      1
    );
  }

  const [rules, fallback] = workflows[label];

  let total = 0;
  for (const rule of rules) {
    const { key, compare, n, target } = rule;
    const [lo, hi] = ranges[key];
    const truthy: Range = compare === "<" ? [lo, n - 1] : [n + 1, hi];
    const falsy: Range = compare === "<" ? [n, hi] : [lo, n];

    if (truthy[0] <= truthy[1]) {
      total += countAccepted(workflows, { ...ranges, [key]: truthy }, target);
    }

    if (falsy[0] <= falsy[1]) {
      ranges = { ...ranges, [key]: falsy };
    } else {
      break;
    }
  }

  total += countAccepted(workflows, ranges, fallback);
  return total;
}
