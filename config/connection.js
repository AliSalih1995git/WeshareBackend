const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));
};

module.exports = connectDatabase;
