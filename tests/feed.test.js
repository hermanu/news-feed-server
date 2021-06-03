const { expect } = require("chai");
const FeedController = require("../src/controllers/feed.controller");

const feedExample = {
  title: "Test title",
  body: "Test Body",
  img: "TestImage.jpg",
  source: "Test Source",
  publisher: "Test Publisher",
};

let newFeed = {};
describe("Feed Controller ", () => {
  it("Create new feed", async () => {
    newFeed = await FeedController.createFeed(feedExample);
    expect(newFeed).to.be.an("object");
  });
  it("Update feed", async () => {
    newFeed.title = "New Title";
    const updatedFeed = await FeedController.updateFeed(newFeed);
    expect(updatedFeed).to.be.an("object");
    expect(updatedFeed.title).to.not.equal("Test title");
    expect(updatedFeed.title).to.equal("New Title");
  });
});

after(() => {
  const mongoose = require("mongoose");
  mongoose.connection.db.dropDatabase();
});
