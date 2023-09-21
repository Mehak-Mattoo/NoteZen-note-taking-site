const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDb connected:${conn.connection.host}`);
  } catch (err) {
    console.log("err", err);
    process.exit();
  }
};

module.exports = connectDB;

// const connectDB = async () => {
//   mongoose.connect(process.env.MONGO_URI),
//     {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     };

//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error: "));
//   db.once("open", function () {
//     console.log("Connected successfully");
//   });
// };

// module.exports = connectDB;
