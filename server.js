const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// var corsOptions = {
//   origin: "http://example.com",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
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
