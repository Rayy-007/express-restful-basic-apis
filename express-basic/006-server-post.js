import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let expenses = [];
let nextId = 1;

app.get("/api/expense", (req, res) => {
  res.status(200).json(expenses);
});

app.post("/api/expense", (req, res) => {
  const { title, amount } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    !Number.isInteger(amount) ||
    amount < 0
  ) {
    return res.status(400).json({
      status: "400",
      message: "Invalid title and amount!",
    });
  }

  const newExpense = {
    id: nextId++,
    title: title.trim(),
    amount: amount,
  };

  expenses = [...expenses, newExpense];

  res.status(201).json({
    status: "201",
    message: "New expense has been created!",
    body: newExpense,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhose:${PORT}`);
});
