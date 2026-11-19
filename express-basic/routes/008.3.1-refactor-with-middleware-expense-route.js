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

router.get("/:id", findExpense, (req, res) => {
  res.json({
    status: "success",
    message: `Expnese found was found with given ID: ${req.params.id}`,
    body: req.expense,
  });
});

router.post("/", (req, res) => {
  const error = validateExpense(req.body);
  if (error) {
    return res.status(400).json({
      status: "invalid",
      message: error,
    });
  }

  const { title, amount, category } = req.body;
  let newId = expenses.length + 1;
  const newExpense = {
    id: newId,
    title,
    amount,
    category,
  };

  expenses.push(newExpense);

  res.status(201).json({
    status: "success",
    message: `New expense is successfully created.`,
    newExpensesRecord: expenses,
  });
});

router.put("/:id", findExpense, (req, res) => {
  const error = validateExpense(req.body);
  if (error) {
    return res.status(400).json({
      status: "invalid",
      message: error,
    });
  }

  // Update expense
  const expense = req.expense;
  const { title, category, amount } = req.body;
  expense.title = title;
  expense.category = category;
  expense.amount = amount;

  res.status(200).json({
    status: "success",
    message: "Expense was updated successfully",
    body: expense,
  });
});

router.patch("/:id", findExpense, (req, res) => {
  const expense = req.expense;
  const error = validatePartialExpense(req.body);

  if (error) {
    return res.status(400).json({
      status: "invalid",
      message: error,
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

router.delete("/:id", findExpense, (req, res) => {
  expenses.splice(req.expenseIndex, 1);

  res.status(204).end();
});

function findExpense(req, res, next) {
  const id = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: `Your given ID was not valid: ${id}`,
    });
  }

  // Find expense with that ID
  // const expense = expenses.find((e) => e.id === id);
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({
      status: "not found",
      message: `Expense with given ID: ${id} was not found`,
    });
  }

  // Attach expense to request
  req.expense = expenses[index];
  req.expenseIndex = index;

  // Continue to next route (Get or Put or Post or Patch or Delete)
  next();
}

function validateExpense(reqBody) {
  const { title, amount, category } = reqBody;
  if (!title || !category || !amount) {
    return `title, category and amount are required`;
  } else if (
    typeof title !== "string" ||
    typeof category !== "string" ||
    !Number.isInteger(amount)
  ) {
    return `You are reqest body is not valid: title or category or amount`;
  }
  return null;
}

function validatePartialExpense(reqBody) {
  const { title, category, amount } = reqBody;

  // Check whether at least one field was provided
  if (title === undefined && category === undefined && amount === undefined) {
    return "At least one field is required.";
  }

  // Validate only the fields provided
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    return "Title must be a non-empty string.";
  }

  if (
    category !== undefined &&
    (typeof category !== "string" || !category.trim())
  ) {
    return "Category must be a non-empty string.";
  }

  if (amount !== undefined && !Number.isInteger(amount)) {
    return "Amount must be an integer.";
  }
  return null;
}

// function validatePartialExpenseV2(data) {
//   const allowedFields = ["title", "amount", "category"];

//   const fields = Object.keys(data);

//   if (fields.length === 0) {
//     return "At least one field is required.";
//   }

//   if (fields.some((field) => !allowedFields.includes(field))) {
//     return "Invalid field provided.";
//   }

//   if (
//     "title" in data &&
//     (typeof data.title !== "string" || !data.title.trim())
//   ) {
//     return "Invalid title.";
//   }

//   if (
//     "category" in data &&
//     (typeof data.category !== "string" || !data.category.trim())
//   ) {
//     return "Invalid category.";
//   }

//   if ("amount" in data && !Number.isInteger(data.amount)) {
//     return "Invalid amount.";
//   }

//   return null;
// }

export default router;
