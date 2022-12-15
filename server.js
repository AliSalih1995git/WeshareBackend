const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const options = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//Datebase
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
