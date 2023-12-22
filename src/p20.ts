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
  const data = await readInputForDay(20);
  console.log("Result part 1", part1(data));
  console.log("Result part 2", part2(data));
};

export function part1(input: string[]) {
  var { modules, broadcastTargets } = extractModuleTargets(input);
  initializeModules(modules);

  const queue = new Deque<QueueItem>([]);

  let lo = 0,
    hi = 0;
  for (let i = 0; i < 1000; i++) {
    const result = pushButton(broadcastTargets, queue, modules);
    lo += result.lo;
    hi += result.hi;
  }

  return lo * hi;
}

let cycleLengths: Record<string, number> = {};
let seen: Record<string, number> = {};
let presses = 0;
let isDone = false;

export function part2(input: string[]) {
  var { modules, broadcastTargets } = extractModuleTargets(input);
  initializeModules(modules);
  const feed = Object.values(modules).find((m) =>
    m.outputs.includes("rx")
  ) as Module;
  seen = Object.entries(modules)
    .filter(([name, module]) => name in module.outputs)
    .reduce((accumulator, [name]) => {
      accumulator[name] = 0;
      return accumulator;
    }, {} as { [name: string]: number });

  const queue = new Deque<QueueItem>([]);
  do {
    presses++;
    pushButton(broadcastTargets, queue, modules, feed);
  } while (!isDone);

  console.log(cycleLengths);

  let x = 0;
  for (const cycleLength of Object.values(cycleLengths)) {
    x += (x * cycleLength) / gcd(x, cycleLength);
  }

  return x;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function pushButton(
  broadcastTargets: string[],
  queue: Deque<QueueItem>,
  modules: Record<string, Module>,
  feed?: Module
) {
  let lo = 1,
    hi = 0;
  broadcastTargets.forEach((x) => queue.append(["broadcaster", x, "lo"]));

  while (!queue.isEmpty()) {
    const [origin, target, pulse] = queue.popLeft() as QueueItem;
    assert(pulse);

    pulse === "lo" ? lo++ : hi++;
    if (!(target in modules)) continue;

    let module = modules[target];

    if (module.name == feed?.name && pulse === "hi") {
      if (!(origin in cycleLengths)) {
        cycleLengths[origin] = presses;
      } else {
        assert(presses == seen[origin] * cycleLengths[origin]);
      }
      seen[origin] += 1;
    }

    if (Object.values(seen).length > 0 && Object.values(seen).every((m) => m)) {
      isDone = true;
      break;
    }

    if (module.type === "%" && pulse === "lo") {
      module.memory = module.memory === "off" ? "on" : "off";
      const outgoing = module.memory === "on" ? "hi" : "lo";
      module.outputs.forEach((output) =>
        queue.append([module.name, output, outgoing])
      );
    } else if (typeof module.memory === "object") {
      module.memory[origin] = pulse;

      const outgoing = Object.values(module.memory).every((x) => x === "hi")
        ? "lo"
        : "hi";
      module.outputs.forEach((output) =>
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
