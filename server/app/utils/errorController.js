const dotenv= require('dotenv');
dotenv.config();

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: "0",
    error: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: "0",
    error: err.message,
  });
};
module.exports = (err, req, res, next) => {
  if (process.env.DEV_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};
