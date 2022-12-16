const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://main.d28fqyt2gxwcsx.amplifyapp.com/"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,PATCH,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override,Content-Type,Accept"
//   );
//   next();
// });

app.use(
  cors({
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin":
        "https://main.d28fqyt2gxwcsx.amplifyapp.com/",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
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
