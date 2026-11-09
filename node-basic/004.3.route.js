import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome!" }));
    return;
  }

  if (req.method === "GET" && req.url === "/api/expenses") {
    res.statusCode = 200;
    res.end(
      JSON.stringify([
        { id: 1, title: "Food", amount: 5000 },
        { id: 2, title: "Transport", amount: 2000 },
      ]),
    );
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});

/** =========== OLD Way of Routing in HTTP (Node) =========== */
// import http from "http";

// const server1 = http.createServer((req, res) => {
//   // Route 1: The Homepage
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Welcome to the Homepage!");
//   }
//   // Route 2: The About Page
//   else if (req.url === "/about" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Learn more about our application here.");
//   }
//   // Route 3: Catch-all 404 Not Found
//   else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 - Route Not Found");
//   }
// });

// server1.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000/");
// });
