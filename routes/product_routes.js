const { Router } = require("express");
const {
  addProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct,
} = require("../controllers/product_controller");
const uploadImage= require('../middleware/file_cloudinary')
const productRouter = Router();

productRouter
  .route("/")
  .get(fetchProducts)
  .post(uploadImage, addProduct)
  .delete(deleteProduct);
productRouter.route("/:id").patch(updateProduct);
productRouter.route("/search/:title").get(searchProduct);

module.exports = productRouter;
