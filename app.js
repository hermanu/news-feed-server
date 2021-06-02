const express = require("express");
const app = express();

require("dotenv").config();
// Connect to mongo

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("mongodb connected"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./src/routes");

app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
