const Feed = require("../models/feed.model");
const moment = require("moment");
const {
  getFrontPageNewsFromEM,
  getFrontPageNewsFromEP,
} = require("../helpers/scrapper");

const todayNews = async () => {
  try {
    const today = moment().format();
    const yesterday = moment().subtract(1, "day").format();
    const todayNews = await Feed.find({
      createdAt: { $lte: today, $gt: yesterday },
    });

    if (todayNews.length > 0) {
      return todayNews;
    } else {
      return await updateNewsFeeds();
    }
  } catch (error) {
    console.log(error);
  }
};

const updateNewsFeeds = async () => {
  try {
    const epNewsFeed = await getFrontPageNewsFromEP();
    const emNewsFeed = await getFrontPageNewsFromEM();

    epNewsFeed.forEach(async (newFeed) => {
      await Feed.findOneAndUpdate({ title: newFeed.title }, newFeed, {
        new: true,
        upsert: true,
      });
    });
    emNewsFeed.forEach(async (newFeed) => {
      await Feed.findOneAndUpdate({ title: newFeed.title }, newFeed, {
        new: true,
        upsert: true,
      });
    });

    const newsFeedList = await Feed.find();
    return newsFeedList;
  } catch (error) {
    console.log(error);
  }
};

const createFeed = async (data) => {
  try {
    let newFeed = new Feed();
    newFeed.title = data.title;
    newFeed.body = data.body;
    newFeed.source = data.source || "Unknow source";
    newFeed.img = data.img || "Image not found";
    newFeed.publishser = data.publisher || "Unknow publisher";
    await newFeed.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateNewsFeeds,
  createFeed,
  todayNews,
};
