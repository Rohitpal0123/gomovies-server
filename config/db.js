const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.log("🚀 ~ error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
