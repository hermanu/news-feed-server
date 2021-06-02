const { assert, expect } = require("chai");
const request = require("supertest");

const app = require("../app");

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
});
