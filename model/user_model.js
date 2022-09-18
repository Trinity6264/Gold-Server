const mongoose = require("mongoose");

const UserSchema = mongoose.Schema;

const Model = new UserSchema(
  {
    username: {
      minlength: 3,
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerify: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", Model);

module.exports = UserModel;
