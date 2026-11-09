import fs from "node:fs/promises";

await fs.writeFile("note.txt", "Learning Node Js");
const content = await fs.readFile("note.txt", "utf-8");
console.log(content);
