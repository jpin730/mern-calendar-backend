const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
