const purchaseModel = require("../model/purchase_model");
const trackModel = require("../model/track_model");
const AsyncWrapper = require("../helper/async_wrapper");
const CustomError = require("../error/custom_error");
const { StatusCodes: st } = require("http-status-codes");
// add product
const addTrack = AsyncWrapper(async (req, res) => {
  const { title, purchaseId } = req.body;
  if (!title) {
    throw new CustomError("Title is mandatory");
  }
  if (!purchaseId) {
    throw new CustomError("Purchase id is mandatory");
  }
  const model = new trackModel({ title });
  const data = await model.save();

  if (!data) {
    throw new CustomError("Purchase initiation failed");
  }
  await purchaseModel.findByIdAndUpdate(
    { _id: purchaseId },
    {
      $push: {
        trks: [data.id],
      },
    }
  );
  return res.status(st.CREATED).json({
    status: true,
    msg: "track added successfully",
    data,
  });
});

const deleteTrack = AsyncWrapper(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await trackModel.findByIdAndRemove({ _id: id });

  if (!data) {
    throw new CustomError("Purchase was not successfully deleted");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Track deleted successfully",
    data: {},
  });
});

// const idDoneUpdate = AsyncWrapper(async (req, res) => {
//   const { id } = req.params;
//   const data = await purchaseModel.findOne({
//     $or: [{ code: { $regex: code || "", $options: "i" } }],
//   });
//   if (!data) {
//     throw new CustomError("Data was not found");
//   }
//   return res.status(st.OK).json({
//     status: true,
//     msg: "Data found",
//     data,
//   });
// });
const updateTrack = AsyncWrapper(async (req, res) => {
  const { id, isDone,title } = req.body;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await trackModel.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );

  if (!data) {
    throw new CustomError("Product was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});
const fetchTracks = AsyncWrapper(async (req, res) => {
  const data = await trackModel.find();
  if (!data) {
    throw new CustomError("Data was not found");
  }
  return res.status(st.OK).json({
    status: true,
    msg: "Data found",
    data,
  });
});
const fetchOneTrack = AsyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError("purchase id was not provided");
  }
  const data = await trackModel.findById({ _id: id });
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
  addTrack,
  updateTrack,
  deleteTrack,
  fetchOneTrack,
  fetchTracks,
};
