const BASE_PATH = "";
Bun.serve({
  port: 3000,
  async fetch(req) {
    const filePath = BASE_PATH + new URL(req.url).pathname;
    const file = Bun.file(import.meta.dir + filePath);
    console.log(import.meta.dir + filePath);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
