require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4200;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//This was added
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/public", express.static(path.join(__dirname, "public/assets")));
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log("This server is running on port : ", port);
});
