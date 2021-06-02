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
      .then((res) => {
        expect(text).to.not.be.undefined;
        expect(text).to.be.an("object");
      });
  });
});
