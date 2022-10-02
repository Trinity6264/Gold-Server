const cloudinary = require("cloudinary").v2;

const uploadImage = async (req, res, next) => {
  const image = req.files.image;
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    folder: "Gold",
    width: 500,
    height: 500,
    crop: "scale",
  });
  req.url = result.url;
  next();
};

cloudinary.config({
  cloud_name: "dhz2xaoai",
  api_key: "496245197916484",
  api_secret: "GEb94MOaMcE8vfHOr-U0vILnCto",
});

module.exports = uploadImage;
