const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4200;

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", require("./routes"));

app.listen(port, (req, res) => {
  console.log("This server is running on port : ", port);
});
