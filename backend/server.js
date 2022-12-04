const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

const dataRoute = require("./ROUTES/dataRoutes");

app.use("/api/data", dataRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "ROUTE NOT FOUND" });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGOOSE CONNECTED");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`NODE APP RUNNING AT PORT ${process.env.PORT}`);
});

connectDB();
