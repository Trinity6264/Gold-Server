const { StatusCodes } = require("http-status-codes") ;

const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send("Routes was not found");
};


module.exports = notFound