const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  console.log(req.method);
  res.send("Hello World!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
