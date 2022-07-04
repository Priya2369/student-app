const express = require("express");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const dotenv = require("dotenv");
const studentsRoutes = require("./routes/students");
const errorController = require("./utils/errorController");
const AppError = require("./utils/appError");
const app = express();
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
console.log(DATABASE_URL);
connectDB(DATABASE_URL);

app.use("/api", studentsRoutes)

app.all("*", (req, res, next) => {
  const err = new AppError(`Request ${req.path} not found!`, 404);
  // err.statusCode = 404;
  next(err);
});

app.use(errorController);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
