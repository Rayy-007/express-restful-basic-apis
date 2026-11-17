import express from "express";

const router = express.Router();

let expenses = [
  { id: 1, title: "Lunch", amount: 5000 },
  { id: 2, title: "Bus", amount: 2000 },
];

router.get("/", (req, res) => {
  console.log(req.params);

  res.json({
    status: "sucess",
    message: `Get all expenses`,
    data: expenses,
  });
});

router.post("/", (req, res) => {
  const { title, amount } = req.body;

  if (typeof title !== "string" || !title.trim() || !Number.isInteger(amount)) {
    return res.status(400).json({
      status: "invalid",
      message: `You are reqest body is not valid: ${title} and ${amount}`,
    });
  }

  let newId = expenses.length + 1;
  const newExpense = {
    id: newId,
    title,
    amount,
  };

  expenses = [...expenses, newExpense];

  res.status(201).json({
    status: "success",
    message: `New expense is successfully created.`,
    newExpensesRecord: expenses,
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    res.status(404).json({
      status: "not found",
      message: `Expense was not found with givent id: ${id}`,
    });
    return;
  }

  const { title, amount } = req.body;
  if (typeof title !== "string" || !title.trim() || !Number.isInteger(amount)) {
    return res.status(400).json({
      status: "invalid",
      message: `You are reqest body is not valid: ${title} and ${amount}`,
    });
  }

  expense.title = title;
  expense.amount = amount;

  res.status(200).json({
    status: "success",
    message: "Expense was updated successfully",
    body: expense,
  });
});

export default router;
