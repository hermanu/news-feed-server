const express = require("express");
const router = express.Router();

const Feed = require("../controllers/feed.controller");

router.get("/", async (req, res) => {
  try {
    const newsFeed = await Feed.getFeeds();
    return res.status(200).json({ status: true, data: newsFeed });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("REQ", req.body);
    const newFeed = await Feed.createFeed(req.body);
    res.status(200).json({ status: true, data: newFeed });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
