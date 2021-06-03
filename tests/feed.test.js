const { assert, expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const feedExample = {
  title: "Test title",
  body: "Test Body",
  img: "TestImage.jpg",
  source: "Test Source",
  publisher: "Test Publisher",
};

describe("Feed endpoints", () => {
  it("GET /feed", async () => {
    await request(app)
      .get("/feed")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.not.be.undefined;
        expect(body).to.be.an("object");
        expect(body.data).to.be.an("array");
        expect(body.data).length.to.be.above(0);
      });
  });

  it("POST /feed", async () => {
    await request(app)
      .post("/feed")
      .set("Accept", "application/json")
      .send(feedExample)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body).to.not.be.undefined;
        expect(body).to.be.an("object").that.has.keys("data", "status");
        expect(body.data).to.have.any.keys(
          "title",
          "body",
          "img",
          "source",
          "publisher"
        );
      });
  });
});

after(() => {
  const mongoose = require("mongoose");
  mongoose.connection.db.dropDatabase();
});
