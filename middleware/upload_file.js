const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    let pathname = path.extname(file.originalname);
    cb(null, Date.now() + pathname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      console.log("ok");
      cb(null, true);
    } else {
      console.log("Jpg and png only");
      cb(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 },
});


module.exports = upload