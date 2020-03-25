const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("Express App", () => {
  it("should return a message from GET /", () => {
    return supertest(app)
      .get("/apps")
      .expect(200);
  });
  it("should return 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "sort must be one of app or rating");
  });
  it("should return an array of books", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
      });
  });
});
