const { Router } = require("express");
const upload = require("../middleware/upload_file");
const {
  addProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct,
} = require("../controllers/product_controller");
const productRouter = Router();

productRouter
  .route("/")
  .get(fetchProducts)
  .post(upload.single("image"), addProduct)
  .delete(deleteProduct);
productRouter.route("/:id").patch(updateProduct);
productRouter.route("/search/:title").get(searchProduct);

module.exports = productRouter;
