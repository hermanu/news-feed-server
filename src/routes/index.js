const express = require("express");
const router = express.Router();

const feed = require("./feed.route");

router.use("/feed", feed);

module.exports = router;
