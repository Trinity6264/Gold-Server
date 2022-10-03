const { Router } = require("express");

const adminRoute = Router();
const { loginAdmin, findAdmin } = require("../controllers/admin_controller");

adminRoute.route("/login").post(loginAdmin);
adminRoute.route("/find").post(findAdmin);

module.exports = adminRoute;
