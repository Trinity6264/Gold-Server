const mongoose = require("mongoose");

const productSchema = mongoose.Schema;

const pModel = new productSchema(
  {
    title: {
      type: String,
      index: true,
      required: [true, "Product name is required"],
    },
    detail: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "Product image path is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", pModel);

module.exports = productModel;
