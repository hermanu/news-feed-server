const Feed = require("../models/feed.model");
const moment = require("moment");
const { getAllFrontPagesNews } = require("../helpers/scrapper");

//Get news feed, forces update if no news were to be found
const getNewsFeed = async () => {
  try {
    const today = moment().startOf("day").format();
    const todayNews = await Feed.find({
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 });

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
    // Borrar todas las noticias de hoy y crear nuevas para evitar
    // noticias duplicadas por estar modificadas

    const today = moment().startOf("day").format();
    const newsFeed = await getAllFrontPagesNews();

    const deleteTodayNews = await Feed.deleteMany({
      createdAt: { $gte: today },
    });

    if (deleteTodayNews.ok === 1) {
      for (const feed of newsFeed) {
        await createFeed(feed);
      }
    }

    const updatedFeedList = await Feed.find({
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 });
    return updatedFeedList;
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
    newFeed.source = data.source;
    newFeed.img = data.img;
    newFeed.publisher = data.publisher;
    return await newFeed.save();
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
const updateFeed = async (id, feed) => {
  try {
    let filter = { _id: id };
    const updatedFeed = await Feed.findOneAndUpdate(filter, feed, {
      new: true,
    });
    return updatedFeed;
  } catch (error) {
    console.log(error);
  }
};
// GET newFeed by id
const getFeedById = async (id) => {
  try {
    return await Feed.findById(id);
  } catch (error) {
    console.log();
  }
};
module.exports = {
  updateNewsFeeds,
  createFeed,
  deleteFeed,
  getNewsFeed,
  updateFeed,
  getFeedById,
};
