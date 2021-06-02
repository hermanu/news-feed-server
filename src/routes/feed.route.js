const express = require("express");
const router = express.Router();

const Feed = require("../controllers/feed.controller");

router.get("/", async (req, res) => {
  try {
    const newsFeed = await Feed.todayNews();
    return res.status(200).json({ data: newsFeed });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newFeed = await Feed.createFeed(req.body);
    res.status(200).json({ status: true, data: newFeed });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Feed.deleteFeed(id);
    res.status(200).json({ data: deleted });
  } catch (error) {
    console.log(error);
  }
});

router.post("/forceUpdate", async (req, res) => {
  try {
    const data = await Feed.updateNewsFeeds();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
