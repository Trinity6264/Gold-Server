const mongoose = require( "mongoose");

const Schema = mongoose.Schema;

const Token = new Schema({
  token: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
});

const TokenModel = mongoose.model("token", Token);

module.exports = TokenModel;
