const path = require("path");
const productRouter = require("./routes/product_routes");
const userRouter = require("./routes/user_routes");
const purchaseRouter = require("./routes/purchase_routes");
const trackRouter = require("./routes/track_routes");
const adminRouter = require("./routes/admin_route");
const express = require("express");
const fileUpload = require("express-fileupload");
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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/api/v1/product",
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "/tmp/"),
    abortOnLimit:true,
    createParentPath:true,
    limits: { fieldSize: 50 * 2024 * 1024 },
  })
);

// api Routes
app.use("/uploads", express.static("./uploads"));
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/track", trackRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    /*
    mongodb+srv://autumshipmentalics:9KHRsSwbcvm7VopY@autum.lrzknyd.mongodb.net/?retryWrites=true&w=majority
    */
    const URL =
      "mongodb+srv://autumshipmentalics:9KHRsSwbcvm7VopY@autum.lrzknyd.mongodb.net/gold?retryWrites=true&w=majority";
    //  const URL = 'mongodb://localhost:27017/';
    await dbSetup(URL);
    app.listen(port, console.log(`Server listening on port: ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
