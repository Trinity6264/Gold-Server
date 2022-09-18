const purchaseModel = require("../model/purchase_model");
const AsyncWrapper = require("../helper/async_wrapper");
const CustomError = require("../error/custom_error");
const { StatusCodes: st } = require("http-status-codes");
// add product
const addPurchase = AsyncWrapper(async (req, res) => {
  const { userId, productId, code } = req.body;

  const model = new purchaseModel({ userId, productId, code });

  const data = await model.save();

  if (!data) {
    throw new CustomError("Purchase initiation failed");
  }
  return res.status(st.CREATED).json({
    status: true,
    msg: "Purchase initiatied successfully",
    data,
  });
});

const deletePurchase = AsyncWrapper(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await purchaseModel.findByIdAndRemove({ _id: id });

  if (!data) {
    throw new CustomError("Purchase was not successfully deleted");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Purcahse deleted successfully",
    data: {},
  });
});

const searchPurchase = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  const data = await purchaseModel.aggregate([
    { $match: { code: id } },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "productId",
        as: "productId",
      },
    },
    {
      $lookup: {
        from: "tracks",
        foreignField: "_id",
        localField: "trks",
        as: "trks",
      },
    },
  ]);
  if (!data) {
    throw new CustomError("Data was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});
const updatePurchase = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await purchaseModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!data) {
    throw new CustomError("Product was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});
const fetchPurchase = AsyncWrapper(async (req, res) => {
  const data = await purchaseModel.aggregate([
    {
      $lookup: {
        from: "tracks",
        localField: "trks",
        foreignField: "_id",
        as: "trks",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productId",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
      },
    },
  ]);
  if (!data) {
    throw new CustomError("Data was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});
const fetchOnePurchase = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await purchaseModel.aggregate([{ $match: { _id: id } }]);
  if (!data) {
    throw new CustomError("Data was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});

module.exports = {
  addPurchase,
  deletePurchase,
  searchPurchase,
  updatePurchase,
  fetchPurchase,
  fetchOnePurchase,
};
