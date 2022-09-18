const CustomError = require("../error/custom_error");

const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: false,
      msg: err.message,
      data: {},
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: false,
    msg: err.message,
    data: {},
  });
};

module.exports = errorHandler;
