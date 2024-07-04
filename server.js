const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
connectDB();
const app = express();
const port = 8396;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const userRouter = require("./routes/user");

app.use("/user", userRouter);


app.use("/", (req, res) => res.send(
  "Welcome to Go Movies!"));

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
