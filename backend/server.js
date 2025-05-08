import express from "express";
import connectDB from "./config/db.js";
import chalk from "chalk";
import { registerUser } from "./controller/userController.js";

const app = express();
app.use(express.json());
const PORT = 5000;

app.post("/api/register-user", registerUser);

connectDB();

app.listen(PORT, () => {
  console.log(
    `${chalk.blue("Server is running on")}${chalk.green.bold(
      ` http://localhost:${PORT}`
    )}`
  );
});
