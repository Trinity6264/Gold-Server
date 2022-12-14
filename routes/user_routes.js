const { Router } = require("express");
const {
  registerUser,
  findUser,
  findUsers,
  loginUser,
  updateUser,
  adminUpdate,
  resetPassword,
  deleteCustomer,
} = require("../controllers/user_controller");

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/resetpassword", resetPassword);
userRouter.route("/").get(findUsers).delete(deleteCustomer);
userRouter.post("/search", findUser);
userRouter.patch("/edit", updateUser);
userRouter.patch("/adminupdate", adminUpdate);
module.exports = userRouter;
