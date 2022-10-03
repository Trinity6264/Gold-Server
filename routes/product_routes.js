const { Router } = require("express");
const upload = require("../middleware/multer");

const {
  addProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct,
} = require("../controllers/product_controller");
const uploadImage = require("../middleware/file_cloudinary");
const productRouter = Router();
const type = upload.single("image");
productRouter
  .route("/")
  .get(fetchProducts)
  .post(type, uploadImage, addProduct)
  .delete(deleteProduct);
productRouter.route("/:id").patch(updateProduct);
productRouter.route("/search/:title").get(searchProduct);

module.exports = productRouter;
