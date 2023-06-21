const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDatabase = require("./config/connection");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Origin",
    "https://weshare-frontend-b5qp.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override,Content-Type,Accept"
  );
  next();
});

app.use(
  cors({
    allowedHeaders: "*",
    allowMethods: "*",
    origin: "*",
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
//Routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

connectDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
