console.clear();
console.log("Bun run", Bun.argv[2]);

const day: number = Number(Bun.argv[2]) || 5;
const { main } = await import(`./src/p${day}.ts`);
main();
