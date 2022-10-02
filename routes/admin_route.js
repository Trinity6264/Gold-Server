const { Router } = require("express");

const adminRoute = Router();
const  loginAdmin  = require("../controllers/admin_controller");

adminRoute.route("/login").post(loginAdmin);

module.exports = adminRoute;
