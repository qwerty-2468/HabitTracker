require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log("MongoDB connection error:", error));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());

const habitsRouter = require("./routes/habits");
app.use("/habits", habitsRouter);
