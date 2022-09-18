const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pModel = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
    },
    code: {
      type: String,
      index: true,
      required: [true, "code is required"],
    },
    idDeleted: {
      type: Boolean,
      default: false,
    },
    trks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "track",
      default: []
    },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model('purchase',pModel);

module.exports = purchaseModel;