const path = require("path");
const productRouter = require("./routes/product_routes");
const userRouter = require("./routes/user_routes");
const purchaseRouter = require("./routes/purchase_routes");
const trackRouter = require("./routes/track_routes");
const express = require("express");
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



app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    /*
    mongodb+srv://autumshipmentalics:9KHRsSwbcvm7VopY@autum.lrzknyd.mongodb.net/?retryWrites=true&w=majority
    */
    await dbSetup('mongodb://localhost:27017/');
    app.listen(port, console.log(`Server listening on port: ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();


