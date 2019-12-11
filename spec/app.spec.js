process.env.NODE_ENV = "test";
const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    describe("/topics", () => {
      it("GET: 200 should return correct status and the topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(response => {
            expect(response.body.topics[0]).to.have.keys([
              "slug",
              "description"
            ]);
            expect(response.body.topics.length).to.equal(3);
          });
      });
      it("GET ERROR:404 should give correct 404 error when topics spelt incorrectly", () => {
        return request(app)
          .get("/api/topisc")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("Not Found");
          });
      });
    });
    describe("/users/:username", () => {
      it("GET: 200 should get individual users by username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(response => {
            expect(response.body.user[0]).to.eql({
              username: "butter_bridge",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              name: "jonny"
            });
          });
      });
      it("GET ERROR:404 sends appropriate error message when given a valid but non-existent username", () => {
        return request(app)
          .get("/api/users/butter_bob")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("username does not exist");
          });
      });
    });
    describe("articles", () => {
      it("GET: 200 should give correct status msg and response when getting articles by id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(response => {
            expect(response.body.article[0]).to.have.keys([
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes",
              "comment_count"
            ]);
          });
      });
      it("GET ERROR: 404 sends an appropriate message when a valid but non-existent id is used", () => {
        return request(app)
          .get("/api/articles/911")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("article does not exist");
          });
      });
      it("GET ERROR: 400 sends an appropriate message when an invalid id is used", () => {
        return request(app)
          .get("/api/articles/my-special-article")
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Invalid id");
          });
      });
      it("PATCH: 200 updates an article and return the response updated article with the correct message", () => {
        return request(app)
          .patch("/api/articles/3")
          .send({
            inc_votes: 5
          })
          .expect(200)
          .then(response => {
            // console.log(response)
            expect(response.body.article[0]).to.have.keys(
              "votes",
              "article_id",
              "author",
              "body",
              "created_at",
              "title",
              "topic"
            );
            expect(response.body.article.length).to.equal(1);
            expect(response.body.article[0].votes).to.equal(5);
          });
      });
      it("PATCH ERROR: 400 sends the appropriate error message when passed an valid id,  but invalid patch", () => {
        return request(app)
          .patch("/api/articles/3")
          .expect(400)
          .send({ in_votes: 2 })
          .then(res => {
            expect(res.body.msg).to.equal("Invalid patch value, bad request");
          });
      });
      it('PATCH ERROR: 400 correct message when inc_votes is included, but as a invalid value (i.e. "string")', () => {
        return request(app)
          .patch("/api/articles/4")
          .expect(400)
          .send({ inc_votes: "Bob" })
          .then(res => {
            expect(res.body.msg).to.equal("Invalid inc_votes value");
          });
      });
      it("PATCH: 200 should return correct votes increase if some other property is added to the patch object", () => {
        return request(app)
          .patch("/api/articles/5")
          .expect(200)
          .send({ inc_votes: 4, name: "Bob" })
          .then(res => {
            expect(res.body.article[0].votes).to.equal(4);
          });
      });
    });
    describe("articles/article_id/comments", () => {
      it("POST: 201 should accept a post object with username and body and post the comment", () => {
        return request(app)
          .post("/api/articles/12/comments")
          .send({
            username: "butter_bridge",
            body: "This comment is absolutely useless...But easy to spot"
          })
          .expect(201)
          .then(response => {
            expect(response.body.comment[0]).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(response.body.comment[0].body).to.equal(
              "This comment is absolutely useless...But easy to spot"
            );
          });
      });
      it("POST ERROR: 400 should give correct error when posting incorrect input object(i.e. non-existent user)", () => {
        return request(app)
          .post("/api/articles/2/comments")
          .send({
            username: "bobbio",
            body: "This is the body of an invalid user"
          })
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("User Invalid");
          });
      });
      it("POST ERROR: 400 should give correct error when posting with an article id which does not exist", () => {
        return request(app)
          .post("/api/articles/15/comments")
          .send({
            username: "butter_bridge",
            body: "This is the body of an invalid user"
          })
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Article Id Invalid");
          });
      });
    });
  });
});
