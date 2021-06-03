const express = require("express");
const app = express();

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// Connect to mongo

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    err ? console.log(err) : console.log("Connected to mongo");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./src/routes");

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});

module.exports = app;
