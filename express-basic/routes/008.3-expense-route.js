import express from "express";

const router = express.Router();

const expenses = [
  { id: 1, title: "Lunch", category: "food", amount: 5000 },
  { id: 2, title: "Bus", category: "transport", amount: 2000 },
  { id: 3, title: "Dinner", category: "food", amount: 8000 },
];

router.get("/", (req, res) => {
  res.json({
    status: "sucess",
    message: `Get all expenses`,
    data: expenses,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: `Your given ID was not valid: ${id}`,
    });
  }

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    return res.status(404).json({
      status: "not found",
      message: `Expense with given ID: ${id} was not found`,
    });
  }

  res.json({
    status: "success",
    message: `Expnese found was found with given ID: ${id}`,
    body: expense,
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

  expenses.push(newExpense);

  res.status(201).json({
    status: "success",
    message: `New expense is successfully created.`,
    newExpensesRecord: expenses,
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: `Your given ID was not valid: ${id}`,
    });
  }

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    res.status(404).json({
      status: "not found",
      message: `Expense was not found with givent id: ${id}`,
    });
    return;
  }

  const { title, amount, category } = req.body;
  if (!title || !category || !amount) {
    return res.status(400).json({
      status: "invalid",
      message: `title: ${title}, category: ${category} and amount ${amount} are required`,
    });
  } else if (
    typeof title !== "string" ||
    typeof category !== "string" ||
    !Number.isInteger(amount)
  ) {
    return res.status(400).json({
      status: "invalid",
      message: `You are reqest body is not valid: ${title} or ${category} or ${amount}`,
    });
  }

  expense.title = title;
  expense.category = category;
  expense.amount = amount;

  res.status(200).json({
    status: "success",
    message: "Expense was updated successfully",
    body: expense,
  });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: "Invalid expense ID.",
    });
  }

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    return res.status(404).json({
      status: "not found",
      message: "Expense not found.",
    });
  }

  const { title, category, amount } = req.body;
  // Check whether at least one field was provided
  if (title === undefined && category === undefined && amount === undefined) {
    return res.status(400).json({
      status: "invalid",
      message: "At least one field is required.",
    });
  }

  // Validate only the fields provided
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return res.status(400).json({
      status: "invalid",
      message: "Title must be a non-empty string.",
    });
  }

  if (
    category !== undefined &&
    (typeof category !== "string" || !category.trim())
  ) {
    return res.status(400).json({
      status: "invalid",
      message: "Category must be a non-empty string.",
    });
  }

  if (amount !== undefined && !Number.isInteger(amount)) {
    return res.status(400).json({
      status: "invalid",
      message: "Amount must be an integer.",
    });
  }

  // Update only the provided fields
  if (title !== undefined) expense.title = title;
  if (category !== undefined) expense.category = category;
  if (amount !== undefined) expense.amount = amount;

  return res.status(200).json({
    status: "success",
    message: "Expense updated successfully.",
    data: expense,
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: `Your given ID was not valid: ${id}`,
    });
  }

  const index = expenses.findIndex((e) => e.id === id);
  if (index < 0) {
    return res.status(404).json({
      status: "not found",
      message: `Expense with given ID: ${id} was not found`,
    });
  }

  expenses.splice(index, 1);

  res.status(204).end();
});

export default router;
