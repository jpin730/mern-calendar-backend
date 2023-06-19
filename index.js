const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
