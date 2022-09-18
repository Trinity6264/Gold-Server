const { Router } = require("express");
const {
  addPurchase,
  deletePurchase,
  fetchOnePurchase,
  fetchPurchase,
  searchPurchase,
  updatePurchase,
} = require("../controllers/purchase_controller");
const purchaseRouter = Router();

purchaseRouter
  .route("/")
  .get(fetchPurchase)
  .post(addPurchase)
  .delete(deletePurchase);
purchaseRouter.route("/:id").patch(updatePurchase).get(fetchOnePurchase);
purchaseRouter.route("/search/:id").get(searchPurchase);

module.exports = purchaseRouter;
