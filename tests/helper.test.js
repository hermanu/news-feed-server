const { expect } = require("chai");

const helper = require("../src/helpers/scrapper");
let newsFeed = [];
before(async () => {
  newsFeed = await helper.getAllFrontPagesNews();
});

describe("Scrapper", () => {
  it("returns an array of feeds", () => {
    expect(newsFeed).to.be.an("array").length(10);
  });

  it("feeds are valid objects ", () => {
    newsFeed.forEach((feed) => {
      expect(feed)
        .to.be.an("object")
        .that.has.all.deep.keys("title", "body", "img", "source", "publisher");
    });
  });
});
