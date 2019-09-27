const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Model = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log("Mongodb Connecred"))
  .catch(err => console.log(err));

app.post("/addString", (req, res) => {
  const { username, password } = req.body;

  const newUser = { username, password };
  new Model(newUser)
    .save()
    .then(response =>
      res.json({ status: "success", message: "String saved successfully" })
    )
    .catch(err =>
      res.json({ status: "error", message: "Error saviing string", err })
    );
});

app.listen(3001, () => console.log("app listening"));
