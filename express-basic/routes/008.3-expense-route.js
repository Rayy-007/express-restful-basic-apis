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
  console.log(req.params);
  console.log(req.body);

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

export default router;
