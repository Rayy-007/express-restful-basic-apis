import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Learnex", age: 34 },
  { id: 2, name: "Khant", age: 30 },
  { id: 3, name: "Space", age: 20 },
];

app.get("/", (req, res) => {
  res.send("Server is up & running");
});

app.get("/users", (req, res) => {
  const { name, age } = req.query;

  const user = users.filter(
    (user) => user.name.toLowerCase() === name || user.age === Number(age),
  );

  console.log(name);
  if (user.length === 0) {
    return res.status(404).json({
      status: "not found",
      message: `User not found with filter ${name} or ${age}`,
    });
  }

  res.json(user);
});

// simple query
// app.get("/user", (req, res) => {
//   const { name, age } = req.query;

//   //   res.send(`${name} ${age}`);
//   res.json({
//     name,
//     age,
//   });
// });

app.listen(PORT);
