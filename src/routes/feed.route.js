const express = require("express");
const router = express.Router();

const Feed = require("../controllers/feed.controller");

//Get today news, does scrap if needed
router.get("/", async (req, res) => {
  try {
    const newsFeed = await Feed.getNewsFeed();
    return res.status(200).json({ data: newsFeed });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const newsFeed = await Feed.getFeedById(req.params.id);
    return res.status(200).json({ data: newsFeed });
  } catch (error) {
    console.log(error);
  }
});

// Create new Feed manually
router.post("/", async (req, res) => {
  try {
    const newFeed = await Feed.createFeed(req.body);
    res.status(200).json({ data: newFeed });
  } catch (error) {
    console.log(error);
  }
});

//Delete feed by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Feed.deleteFeed(id);
    res.status(200).json({ data: deleted });
  } catch (error) {
    console.log(error);
  }
});

//Update feed by id
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const feed = req.body;
    const updatedFeed = await Feed.updateFeed(id, feed);
    res.status(200).json({ data: updatedFeed });
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
