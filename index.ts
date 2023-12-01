console.log("Bun run", Bun.argv[2]);

const day: number = Number(Bun.argv[2]) || 1;
await import(`./src/p${day}.ts`);
