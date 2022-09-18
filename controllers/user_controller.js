const AsyncWrapper = require("../helper/async_wrapper");
const UserModel = require("../model/user_model");
const CustomError = require("../error/custom_error");
const { StatusCodes: st } = require("http-status-codes");
const TokenModel = require("../model/token_model");
const sendVerificationEmail = require("../helper/send_email");
const {
  decrptyPassword,
  encrptyPassword,
} = require("../helper/password_encrypt");

// Register user

const registerUser = AsyncWrapper(async (req, res) => {
  const { email, password, username } = req.body;
  if (!username || username.length < 3) {
    throw new CustomError("Username must be more than 2 Char", 401);
  }
  if (!password || password.length < 6) {
    throw new CustomError("Password must be more than 5 Char", 401);
  }
  if (!email) {
    throw new CustomError("Please provide your email", 401);
  }

  const verifyEmail = await UserModel.findOne({ $or: [{ email }] });
  if (verifyEmail) {
    throw new CustomError("Email Already exist");
  }

  const hashedPassword = await encrptyPassword(password);

  const user = new UserModel({ email, username, password: hashedPassword });

  const resp = await user.save();

  const token = Date.now();
  await new TokenModel({
    token,
    email,
  }).save();

  //   send email to the user
  const play = await sendVerificationEmail({
    email: resp.email,
    name: resp.username,
    // localhost:
    origin: "http://localhost:3000/",
    token: token,
  });
  return res.status(201).json({
    status: true,
    msg: "User account created, Please check your mail to verify your account.",
    data: {},
  });
});

// Login
const loginUser = AsyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new CustomError("Provide valid email");
  }
  if (!password) {
    throw new CustomError("Provide valid password");
  }
  const data = await UserModel.findOne({ $or: [{ email }] });
  if (!data) {
    throw new CustomError("Email provided was not found");
  }
  const confirmPassword = await decrptyPassword(password, data.password);
  if (!confirmPassword) {
    throw new CustomError("User password was incorrect");
  }
  if (!data.isEmailVerify) {
    throw new CustomError("Please verify your account");
  }
  if (data.isBlocked === true) {
    throw new CustomError(
      "Account has been temporary blocked,Please contact the team"
    );
  }
  return res.status(200).json({
    status: true,
    msg: "User login succesful",
    data: {
      id: data.id,
      username: data.username,
      email: data.email,
    },
  });
});
const loginAdmin = AsyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new CustomError("Provide valid email");
  }
  if (!password) {
    throw new CustomError("Provide valid password");
  }
  const data = await UserModel.findOne({ $or: [{ email }] });
  if (!data) {
    throw new CustomError("Email provided was not found");
  }
  const confirmPassword = await decrptyPassword(password, data.password);
  if (!confirmPassword) {
    throw new CustomError("User password was incorrect");
  }
  if (!data.isEmailVerify) {
    throw new CustomError("Please verify your account");
  }
  if (!data.isAdmin) {
    throw new CustomError("You are not authourized");
  }
  if (data.isBlocked === true) {
    throw new CustomError(
      "Account has been temporary blocked,Please contact the team"
    );
  }
  return res.status(200).json({
    status: true,
    msg: "User login succesful",
    data: {
      id: data.id,
      username: data.username,
      email: data.email,
    },
  });
});

//! Reset password
const resetPassword = AsyncWrapper(async (req, res) => {
  const { password, id } = req.body;
  if (!password || password.length < 6) {
    throw new CustomError("Password must be more than 5 Char", 401);
  }
  const hashedPassword = await encrptyPassword(password);

  const resp = await UserModel.findByIdAndUpdate(id, {
    password: hashedPassword,
  });
  if (!resp) {
    throw new CustomError("Operation Failed", 401);
  }
  return res.status(201).json({
    status: true,
    msg: "Password reset successfully",
    data: {},
  });
});

const updateUser = AsyncWrapper(async (req, res) => {
  const { email, username } = req.body;
  let body = {};
  if (email) {
    body.email = email;
  }
  if (username) {
    body.username = username;
  }

  const data = await UserModel.findOneAndUpdate(
    { email },
    { ...body },
    { new: true }
  ).select("-password");
  if (!user) {
    throw new CustomError("User details could not updated");
  }
  return res.status(200).json({
    status: true,
    msg: "User details updated successfully",
    data,
  });
});
const adminUpdate = AsyncWrapper(async (req, res) => {
  const { id } = req.body;
  const data = await UserModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  ).select("-password");
  if (!data) {
    throw new CustomError("User details could not updated");
  }
  return res.status(200).json({
    status: true,
    msg: "User details updated successfully",
    data,
  });
});

const findUser = AsyncWrapper(async (req, res) => {
  const { email } = req.body;
  const data = await UserModel.findOne({ $or: [{ email }] });
  console.log(data);
  if (!data) {
    throw new CustomError("User was not found");
  }
  return res.status(200).json({
    status: true,
    msg: "User account found",
    data,
  });
});

const findUsers = AsyncWrapper(async (req, res) => {
  const data = await UserModel.find().select("-password");
  if (!data) {
    throw new CustomError("Updating was not successful", 401);
  } else {
    res.status(200).json({
      status: true,
      msg: "Data found",
      data,
    });
  }
});

const deleteCustomer = AsyncWrapper(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("User id was not provided");
  }
  const data = await UserModel.findByIdAndRemove({ _id: id });

  if (!data) {
    throw new CustomError("User was not successfully deleted");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "User deleted successfully",
    data: {},
  });
});

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  updateUser,
  findUser,
  findUsers,
  adminUpdate,
  resetPassword,
  deleteCustomer,
};
