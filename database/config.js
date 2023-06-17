const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {});
    console.log("Database connected.");
  } catch {
    throw new Error("Error on database connection.");
  }
};

module.exports = { dbConnection };
