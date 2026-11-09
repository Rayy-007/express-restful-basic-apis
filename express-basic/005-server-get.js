import express from "express";

const app = express();
const PORT = 3000;

// Middleware: that parse incoming JSON
app.use(express.json());

// app.METHOD(ROUTE, HANDLER)
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Welcome to Express API",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "/api/health route is working.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
