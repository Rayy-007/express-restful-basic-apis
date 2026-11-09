async function getExpenses() {
  return [
    { title: "Food", amount: 5000 },
    { title: "Transport", amount: 2000 },
  ];
}

// const expenses = await getExpenses();
async function loadExpenses() {
  try {
    const expenses = await getExpenses();

    return expenses;
  } catch (error) {
    console.error("Failed to load expenses:", error);

    throw error;
  }
}

const expenses = await loadExpenses();

console.log(expenses);
