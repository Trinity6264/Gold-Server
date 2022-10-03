const AsyncWrapper = require("../helper/async_wrapper");
const UserModel = require("../model/user_model");
const CustomError = require("../error/custom_error");
const { decrptyPassword } = require("../helper/password_encrypt");
const { StatusCodes: st } = require("http-status-codes");

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
  return res.status(st.OK).json({
    status: true,
    msg: "User login succesful",
    data: {
      id: data.id,
      username: data.username,
      email: data.email,
    },
  });
});
const findAdmin = AsyncWrapper(async (req, res) => {
  const { id } = req.body;

  const data = await UserModel.findById(id);
  if (!data) {
    throw new CustomError("User Not found");
  }

  return res.status(st.OK).json({
    status: true,
    msg: "User found",
    data: {
      id: data.id,
      username: data.username,
      email: data.email,
    },
  });
});
module.exports = { loginAdmin, findAdmin };
