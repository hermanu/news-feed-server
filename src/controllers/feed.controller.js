const Feed = require("../models/feed.model");

const getFeeds = async () => {
  try {
    const feedList = await Feed.find();
    return feedList;
  } catch (error) {
    console.log(error);
  }
};

const createFeed = async (data) => {
  try {
    let newFeed = new Feed();
    newFeed.title = data.title;
    newFeed.body = data.body;
    newFeed.source = data.source;
    await newFeed.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFeeds,
  createFeed,
};
