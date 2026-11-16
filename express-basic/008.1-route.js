import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

const router = express.Router();

let expenses = [
  { id: 1, title: "Lunch", amount: 5000 },
  { id: 2, title: "Bus", amount: 2000 },
];

app.get("/", (req, res) => {
  res.json({
    message: "Server is up & running",
  });
});

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "All Expenses",
    body: expenses,
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "not valid request",
      message: "Please request with Valid id",
    });
  }

  const foundExpense = expenses.find((expense) => expense.id === id);

  if (!foundExpense) {
    return res.status(404).json({
      status: "not found",
      message: `Expense not found with id: ${id}`,
    });
  }

  expenses = expenses.filter((expense) => expense.id !== id);

  res.status(200).json({
    status: "success",
    message: `Expense with id ${id} was successfully deleted`,
    remainingExpense: expenses,
  });
});

app.use("/api/expenses", router);

app.listen(PORT, () => {
  console.log(`Servering running at http://localhost:${PORT}`);
});
