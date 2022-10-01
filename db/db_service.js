const mongoose = require("mongoose");

const dbSetup = async (uri) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      keepAlive: true,
      connectTimeoutMS: 90000,
    })
    .then(() => {
      mongoose.connection.once("open", () => {
        console.log("Database is connected");
      });

      mongoose.connection.on("open", () => {
        console.log("Database disconnected");
      });
      mongoose.connection.on("close", () => {
        console.log("Database disconnected");
      });
    })
    .catch((err) => {
      console.log("====================================");
      console.log(err.message);
      console.log("====================================");
    });
};

module.exports = dbSetup;
