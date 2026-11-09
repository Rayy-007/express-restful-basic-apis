import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      message: "Hello from node http server",
    }),
  );
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
