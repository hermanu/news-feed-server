const Feed = require("../models/feed.model");
const moment = require("moment");
const { getAllFrontPagesNews } = require("../helpers/scrapper");

const todayNews = async () => {
  try {
    const today = moment().format();
    const yesterday = moment().subtract(1, "day").format();
    const todayNews = await Feed.find({
      createdAt: { $lte: today, $gt: yesterday },
    });

    if (todayNews.length) {
      return todayNews;
    } else {
      return await updateNewsFeeds();
    }
  } catch (error) {
    console.log(error);
  }
};

// Force update to news feeds
const updateNewsFeeds = async () => {
  try {
    const newsFeed = await getAllFrontPagesNews();
    const newsFeedList = [];
    for (const feed of newsFeed) {
      const newFeed = await Feed.findOneAndUpdate({ title: feed.title }, feed, {
        new: true,
        upsert: true,
      });
      newsFeedList.push(newFeed);
    }
    return newsFeedList;
  } catch (error) {
    console.log(error);
  }
};

// Create feed manually
const createFeed = async (data) => {
  try {
    let newFeed = new Feed();
    newFeed.title = data.title;
    newFeed.body = data.body;
    newFeed.source = data.source || "Unknow source";
    newFeed.img = data.img || "Image not found";
    newFeed.publishser = data.publisher || "Unknow publisher";
    await newFeed.save();

    return await Feed.findById(newFeed._id);
  } catch (error) {
    console.log(error);
  }
};

// Delete feed
const deleteFeed = async (id) => {
  try {
    let filter = { _id: id };
    const deletedCount = await Feed.deleteOne(filter);
    return deletedCount;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateNewsFeeds,
  createFeed,
  deleteFeed,
  todayNews,
};
