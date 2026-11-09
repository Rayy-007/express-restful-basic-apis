import { readFile, writeFile } from "node:fs/promises";

writeFile("config.json", '{"name":"John Doe","age":30,"isEmployee":true}');

async function readConfig() {
  try {
    const content = await readFile("node-basic/config.json", "utf8");

    return JSON.parse(content);
  } catch (error) {
    console.error("Could not load configuration:", error.message);

    throw error;
  }
}

try {
  const config = await readConfig();
  console.log(config);
} catch {
  console.log("Application configuration could not be loaded.");
}
