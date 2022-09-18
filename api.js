const path = require("path");
const productRouter = require("./routes/product_routes");
const userRouter = require("./routes/user_routes");
const purchaseRouter = require("./routes/purchase_routes");
const trackRouter = require("./routes/track_routes");
const express = require("express");
const serverless = require('serverless-http')
const { config } = require("dotenv");
const morgan = require("morgan");
const dbSetup = require("./db/db_service.js");
const notFound = require("./helper/not_found.js");
const errorHandler = require("./helper/error_handler.js");
config();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// api Routes
app.use("/uploads", express.static("./uploads"));
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/track", trackRouter);


// pages Routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/login.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/home.html"));
});
app.get("/customer", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/customer.html"));
});
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/product.html"));
});
app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/account.html"));
});
app.get("/purchase", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/purchased.html"));
});
app.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/reset_password.html"));
});
app.get("/tracker/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/tracker.html"));
});

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await dbSetup('mongodb+srv://autumshipmentalics:9KHRsSwbcvm7VopY@autum.lrzknyd.mongodb.net/?retryWrites=true&w=majority');
    app.listen(port, console.log(`Server listening on port: ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();


module.exports.handler = serverless(app)