const Feed = require("../models/feed.model");
const moment = require("moment");
const { getAllFrontPagesNews } = require("../helpers/scrapper");

const todayNews = async () => {
  try {
    const today = moment().startOf("day").format();
    // const yesterday = moment().endOf("day").subtract(1, "day").format();
    const todayNews = await Feed.find({
      createdAt: { $gte: today },
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

// Force update all news feeds
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

// Update single feed
const updateFeed = async (feed) => {
  try {
    let filter = { _id: feed.id };
    const updatedFeed = await Feed.findOneAndUpdate(filter, feed, {
      new: true,
    });
    return updatedFeed;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateNewsFeeds,
  createFeed,
  deleteFeed,
  todayNews,
  updateFeed,
};
