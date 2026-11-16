import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Learnex" },
  { id: 2, name: "Khant" },
  { id: 3, name: "Space" },
];

app.get("/user", (req, res) => {
  //   res.sendStatus(200);
  res.status(200).json({
    status: "ok",
    message: "Route is up and running",
    data: users,
  });
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "invalid",
      message: "Invalid Id",
    });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: "not found",
      message: `Data not found with id: ${id}`,
    });
  }

  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
