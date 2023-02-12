const mongoose = require("mongoose");
const { MONGODB_URI, DB_NAME } = process.env;

mongoose.set('strictQuery', false);
exports.connect = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("LOG: DB Connection successful.");
    })
    .catch((error) => {
      console.log("LOG: An error occurred. Exiting...");
      console.error(error);
      process.exit(1);
    });
};