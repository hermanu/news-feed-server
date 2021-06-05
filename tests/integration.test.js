const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const feedExample = {
  title: "Test title",
  body: "Test Body",
  img: "TestImage.jpg",
  source: "Test Source",
  publisher: "Test Publisher",
};
let feed = {};

describe("Feed endpoints", () => {
  it("GET /feed - Returns array of feeds", async () => {
    await request(app)
      .get("/feed")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an("object").that.has.key("data");
        expect(body.data).to.be.an("array");
        expect(body.data).length.to.be.above(0);
      });
  });

  it("POST /feed - Creates a new feed", async () => {
    await request(app)
      .post("/feed")
      .set("Accept", "application/json")
      .send(feedExample)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an("object").that.has.key("data");
        expect(body.data).to.have.any.keys(
          "title",
          "body",
          "img",
          "source",
          "publisher",
          "createdAt"
        );
        feed = body.data;
      });
  });

  it("GETBYID /feed:id - Retrieves feed information given an _id", async () => {
    await request(app)
      .get(`/feed/${feed._id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an("object").that.has.key("data");
        expect(body.data._id).to.equal(feed._id);
      });
  });

  it("UPDATE /feed/:id - Updates feed given an _id", async () => {
    feed.title = "New Title";
    await request(app)
      .patch(`/feed/${feed._id}`)
      .set("Accept", "application/json")
      .send(feed)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an("object").that.has.key("data");
        expect(body.data.title).to.be.equal(feed.title);
      });
  });

  it("DELETE /feed/:id - Deletes feed given an _id", async () => {
    await request(app)
      .delete(`/feed/${feed._id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.be.an("object").that.has.key("data");
        expect(body.data).to.have.keys("n", "ok", "deletedCount");
      });
  });
});

after(() => {
  const mongoose = require("mongoose");
  mongoose.connection.db.dropDatabase();
});
