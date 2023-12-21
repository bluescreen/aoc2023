import assert from "assert";
import { readInputForDay, readInputForDayExample } from "../util";
import Deque from "./deque";

type Module = {
  name: string;
  type: string;
  outputs: string[];
  memory: string | Record<string, string>;
};
type QueueItem = [string, string, string];

export const main = async () => {
  const data = await readInputForDayExample(20);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export function part1(input: string[]) {
  var { modules, broadcastTargets } = extractModuleTargets(input);
  initializeModules(modules);

  const queue = new Deque<QueueItem>([]);

  let lo = 0,
    hi = 0;
  for (let i = 0; i < 1; i++) {
    const result = pushButton(broadcastTargets, queue, modules, lo, hi);
    console.log(result);
    lo += result.lo;
    hi += result.hi;
  }

  return lo * hi;
}

function pushButton(
  broadcastTargets: string[],
  queue: Deque<QueueItem>,
  modules: Record<string, Module>,
  lo: number,
  hi: number
) {
  lo++;
  broadcastTargets.forEach((x) => queue.append(["broadcaster", x, "lo"]));

  while (!queue.isEmpty()) {
    const [origin, target, pulse] = queue.popLeft() as QueueItem;
    assert(pulse);
    console.log(origin, "-" + pulse, "->", target);

    pulse === "lo" ? lo++ : hi++;
    if (!(target in modules)) continue;

    let { type, memory, outputs } = modules[target];

    let outgoing: "lo" | "hi";
    if (typeof memory === "string" && type === "%" && pulse === "lo") {
      memory = memory === "off" ? "on" : "off";
      outgoing = memory === "on" ? "hi" : "lo";

      outputs.forEach((output) =>
        queue.append([modules[target].name, output, outgoing])
      );
    } else {
      const newMemory = memory;
      newMemory[origin] = pulse;
      outgoing = Object.values(newMemory).every((x) => x === "hi")
        ? "lo"
        : "hi";
      outputs.forEach((output) =>
        queue.append([modules[target].name, output, outgoing])
      );
    }
  }
  return { lo, hi };
}

function initializeModules(modules: Record<string, Module>) {
  for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
      if (output in modules && modules[output].type === "&") {
        (modules[output] as any).memory[name] = "lo";
      }
    }
  }
}

function extractModuleTargets(input: string[]): {
  modules: Record<string, Module>;
  broadcastTargets: string[];
} {
  let broadcastTargets: string[] = [];
  const modules: Record<string, Module> = {};

  for (const [left, right] of input.map((line) => line.trim().split(" -> "))) {
    if (left === "broadcaster") broadcastTargets = right.split(", ");
    else {
      const [type, name] = [left[0], left.slice(1)];
      modules[name] = {
        name,
        type,
        outputs: right.split(", "),
        memory: type === "%" ? "off" : {},
      };
    }
  }
  return { modules, broadcastTargets };
}

export function part2(input: string[]) {
  return 0;
}
