const { StatusCodes } = require( "http-status-codes");

class CustomError extends Error {
  constructor(mes) {
    super(mes);
    this.message = mes;
    this.status = StatusCodes.BAD_REQUEST;
  }
}


module.exports =  CustomError;