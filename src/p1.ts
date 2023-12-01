import path from "path"
const file = Bun.file( path.resolve("./inputs/p1.txt"));

const data = (await file.text()).split("\n");

for (let i in data) {
    console.log("Row", i, data[i]);
}
