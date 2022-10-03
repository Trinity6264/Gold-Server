const cloudinary = require("cloudinary").v2;
const CustomError = require("../error/custom_error");
const uploadImage = async (req, res, next) => {
  const image = req.files.image;
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      public_id: `${Date.now()}`,
      folder: "Gold",
      width: 500,
      height: 500,
      crop: "fill",
    });
    if (!result) {
      throw new CustomError("Post was not successful");
    }
    req.url = result.url;
    next();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

cloudinary.config({
  cloud_name: "dhz2xaoai",
  api_key: "496245197916484",
  api_secret: "GEb94MOaMcE8vfHOr-U0vILnCto",
});

module.exports = uploadImage;
