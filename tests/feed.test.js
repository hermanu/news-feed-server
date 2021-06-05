const { expect } = require("chai");
const FeedController = require("../src/controllers/feed.controller");

const feedExample = {
  title: "Test title",
  body: "Test Body",
  img: "TestImage.jpg",
  source: "Test Source",
  publisher: "Test Publisher",
};

// before(async () => {
//   await FeedController.getNewsFeed();
// });

describe("Feed Controller ", () => {
  let newFeed = {};
  it("Create new feed", async () => {
    newFeed = await FeedController.createFeed(feedExample);
    expect(newFeed).to.be.an("object");
    expect(newFeed.createdAt).to.not.be.undefined;
    expect(newFeed.updatedAt).to.be.equal(newFeed.createdAt);
  });

  it("Get feed by Id", async () => {
    const currentFeed = await FeedController.getFeedById(newFeed.id);
    expect(currentFeed.id).to.be.equal(newFeed.id);
  });

  it("Update feed", async () => {
    newFeed.title = "New Title Test";
    const updatedFeed = await FeedController.updateFeed(newFeed.id, newFeed);
    expect(updatedFeed).to.be.an("object");
    expect(updatedFeed.updatedAt).to.not.be.equal(newFeed.createdAt);
    expect(updatedFeed.title).to.equal(newFeed.title);
  });

  it("Delete feed", async () => {
    deletedFeed = await FeedController.deleteFeed(newFeed.id);
    expect(deletedFeed)
      .to.be.an("object")
      .that.has.keys("n", "ok", "deletedCount");
  });

  it("Get today news", async () => {
    const newsFeedList = await FeedController.getNewsFeed();
    expect(newsFeedList).to.be.an("array").length(10);
    newsFeedList.forEach((feed) => {
      expect(feed).to.be.an("object");
      expect(feed.createdAt).to.not.be.undefined;
    });
  });
});

after(() => {
  const mongoose = require("mongoose");
  mongoose.connection.db.dropDatabase();
});
