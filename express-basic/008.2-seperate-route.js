import express from "express";
import expenseRoute from "./routes/008.3-expense-route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

app.use("/api/expenses", expenseRoute);

app.listen(3000, () => {
  console.log("Server running at port http://localhost:3000/");
});
