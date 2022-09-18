const productModel = require("../model/product_model");
const AsyncWrapper = require("../helper/async_wrapper");
const CustomError = require("../error/custom_error");
const { StatusCodes: st } = require("http-status-codes");
// add product
const addProduct = AsyncWrapper(async (req, res) => {
  const { title, detail, price } = req.body;
  const model = new productModel({ title, detail, price });
  if (!req.file) {
    throw new CustomError("Image is required");
  }
  if (req.file) {
    model.image = req.file.path;
  }
  const data = await model.save();

  if (!data) {
    throw new CustomError("Product was not successfully added");
  }
  return res.status(st.CREATED).json({
    status: true,
    msg: "Product added successfully",
    data,
  });
});

const deleteProduct = AsyncWrapper(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("Product id was not provided");
  }
  const data = await productModel.findByIdAndRemove({ _id: id });

  if (!data) {
    throw new CustomError("Product was not successfully deleted");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Product deleted successfully",
    data: {},
  });
});

const searchProduct = AsyncWrapper(async (req, res) => {
  const { title } = req.params;
  const data = await productModel.findOne({
    $or: [{ title: { $regex: title || "", $options: "i" } }],
  });
  if (!data) {
    throw new CustomError("Product was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Product found",
    data,
  });
});
const updateProduct = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!data) {
    throw new CustomError("Product was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Product found",
    data,
  });
});
const fetchProducts = AsyncWrapper(async (req, res) => {
  const data = await productModel.find();

  if (!data) {
    throw new CustomError("Product was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Product found",
    data,
  });
});

module.exports = {
  addProduct,
  deleteProduct,
  searchProduct,
  updateProduct,
  fetchProducts,
};
