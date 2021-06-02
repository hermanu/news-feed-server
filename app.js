const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// Connect to mongo
const mongoose = require("mongoose");
const MONGO_DB_URI = "mongodb://localhost:27017/avantio";
mongoose.connect(
  MONGO_DB_URI,
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
