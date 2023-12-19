import { readInputForDayExample, readInputForDayRaw } from "../util";

type Entry = { x: number; m: number; a: number; s: number };
type RulesMap = Map<string, Function>;

export const main = async () => {
  const data = await readInputForDayRaw(19);
  console.log("Result part 1", part1(data));
  //console.log("Result part 2", part2(data));
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

export const part2 = (input: string[]): number => {
  return 0;
};

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
          .map((v) => {
            const rule = v.split(":");
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
