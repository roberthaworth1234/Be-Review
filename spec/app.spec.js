process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const chaiSorted = require("chai-sorted");

const connection = require("../db/connection");

const { expect } = require("chai");
chai.use(chaiSorted);

describe("app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET 200: get api paths in JSON", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
        });
    });
    describe("/topics", () => {
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["patch", "put", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/topics")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
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
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["patch", "put", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/users/butter_bridge")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
      it("GET: 200 should get individual users by username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(response => {
            expect(response.body.user).to.eql({
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
    describe("articles/:article_id", () => {
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["patch", "put", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/articles")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["put", "delete", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/articles/3")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
      it("GET: 200 should give correct status msg and response when getting articles by id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(response => {
            expect(response.body.article).to.have.keys([
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes",
              "comment_count"
            ]);
            expect(response.body.article.article_id).to.have.equal(1);
            expect(response.body.article.comment_count).to.equal("13");
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
            expect(response.body.article).to.have.keys(
              "votes",
              "article_id",
              "author",
              "body",
              "created_at",
              "title",
              "topic"
            );
            expect(response.body.article.votes).to.equal(5);
          });
      });
      it("PATCH: 200 ignores a patch request when no information sent in the patch body, returns article unchanged", () => {
        return request(app)
          .patch("/api/articles/3")
          .expect(200)
          .send({})
          .then(res => {
            expect(res.body.article).to.eql({
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              topic: "mitch",
              author: "icellusedkars",
              body: "some gifs",
              created_at: "2010-11-17T12:21:54.171Z",
              votes: 0
            });
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
            expect(res.body.article.votes).to.equal(4);
            expect(res.body.article.article_id).to.equal(5);
          });
      });
    });
    describe("articles/:article_id/comments", () => {
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["put", "delete", "patch"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/articles/3/comments")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
      it("POST: 201 should accept a post object with username and body and post the comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "This comment is absolutely useless...But easy to spot"
          })
          .expect(201)
          .then(response => {
            expect(response.body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(response.body.comment.body).to.equal(
              "This comment is absolutely useless...But easy to spot"
            );
          });
      });
      it("POST ERROR: 400 bad request if post request does not contain all keys", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ body: "Comment body for posting" })
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Invalid Post Input");
          });
      });
      it("POST ERROR: 400 bad request if post request does not contain a correct body, but does contain a correct username", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({ username: "rogersop" })
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Invalid Post Input");
          });
      });
      it("POST ERROR: 404 should give correct response when a post contains a valid article_id that doesnt exist", () => {
        return request(app)
          .post("/api/articles/1000/comments")
          .send({
            username: "butter_bridge",
            body: "This should not be posted as the article 1000 does not exist"
          })
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("article not found");
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
      it("POST ERROR: 404 should give correct error when posting with an article id which does not exist", () => {
        return request(app)
          .post("/api/articles/15/comments")
          .send({
            username: "butter_bridge",
            body: "comment post"
          })
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("article not found");
          });
      });
      it("GET 404: Not found message when given a valid but non-existent article_id", () => {
        return request(app)
          .get("/api/articles/10000/comments")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("article not found");
          });
      });
      it("GET 200: should return the comments relating to specific article id", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then(response => {
            expect(response.body.comments[0]).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(response.body.comments).to.have.lengthOf(2);
            expect(response.body.comments[0].comment_id).to.equal(1);
          });
      });
      it("GET QUERY 200: should sortBy column name passed in the query", () => {
        return request(app)
          .get("/api/articles/9/comments?sort_by=author")
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET QUERY 200: should be able to sort comments descending using an order query", () => {
        return request(app)
          .get("/api/articles/9/comments?order=asc")
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET QUERY 200: should be able to sort a specific comment by column and spicifying which order", () => {
        return request(app)
          .get("/api/articles/9/comments?sort_by=author&&order=desc")
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET QUERY 200: if passed an incorrect key name in the query, should sort by the default created_at", () => {
        return request(app)
          .get("/api/articles/9/comments?sort_b=author")
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET QUERY ERROR 400: if passed an incorrect value into the query, should return with not found", () => {
        return request(app)
          .get("/api/articles/9/comments?sort_by=auth")
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Query Request Invalid");
          });
      });
      it("GET QUERY 200: should still sortby author if order value is incorrectly passed", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author&order=ac")
          .expect(200)
          .then(response => {
            expect(response.body.comments).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET QUERY ERROR 400: should give a correct error when query built incorrectly", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=authororder=asc")
          .expect(400)
          .then(response => {
            expect(response.body.msg).to.equal("Query Request Invalid");
          });
      });
    });
    describe("GET articles ?queries", () => {
      it("GET 200: should articles by valid column, defaulting to the date column", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(response => {
            expect(response.body.articles[0]).to.have.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "body",
              "votes",
              "comment_count",
              "title"
            );
            expect(response.body.articles.length).to.equal(12);
          });
      });
      it("GET QUERY 200: returns all articles and sort by the queried column", () => {
        return request(app)
          .get("/api/articles?sort_by=author")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET QUERY 200: returns all articles in the correct order, defaulting to use created_at", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET QUERY 200: returns all articles in the correct order that is passed and the column passed", () => {
        return request(app)
          .get("/api/articles?sort_by=topic&order=asc")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.be.sortedBy("topic", {
              descending: false
            });
          });
      });
      it("GET QUERY 200: should return all articles specified by the author username", () => {
        return request(app)
          .get("/api/articles?author=rogersop")
          .expect(200)
          .then(response => {
            expect(response.body.articles.length).to.equal(3);
            expect(response.body.articles[0].author).to.equal("rogersop");
          });
      });
      it("GET QUERY 200: should return all articles specified by the topics", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(response => {
            expect(response.body.articles.length).to.equal(1);
          });
      });
      it("GET QUERY 200: should give correct empty array when author requested who has written no articles", () => {
        return request(app)
          .get("/api/articles?author=lurker")
          .expect(200)
          .then(response => {
            expect(response.body.articles).to.eql([]);
          });
      });
      it("GET QUERY ERROR 404: should give correct error when author is not a valid user", () => {
        return request(app)
          .get("/api/articles?author=luker")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("user not found");
          });
      });
      it("GET QUERY ERROR 404: should give correct error when topic is not valid/present", () => {
        return request(app)
          .get("/api/articles?topic=wrong")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("topic not found");
          });
      });
      it("GET QUERY ERROR 404: should give correct error when topic is given as a number", () => {
        return request(app)
          .get("/api/articles?topic=12")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("topic not found");
          });
      });
      it("GET QUERY ERROR 404: should give correct error when author is given as a number instead of a string", () => {
        return request(app)
          .get("/api/articles?author=2")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("user not found");
          });
      });
    });

    describe("/comments/comments:id", () => {
      it("PATCH 200: should increment a comments vote by 1", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(response => {
            expect(response.body.comment).to.have.keys(
              "votes",
              "article_id",
              "author",
              "body",
              "created_at",
              "comment_id"
            );
            expect(response.body.comment.votes).to.equal(15);
            expect(response.body.comment.comment_id).to.equal(2);
          });
      });
      it("PATCH 200: should decrement inc votes by -1 value", () => {
        return request(app)
          .patch("/api/comments/5")
          .expect(200)
          .send({ inc_votes: -1 })
          .then(response => {
            expect(response.body.comment.votes).to.equal(-1);
            expect(response.body.comment.comment_id).to.equal(5);
          });
      });
      it("PATCH 200: should decrement inc votes by 1, even if orginal votes value is a negative value", () => {
        return request(app)
          .patch("/api/comments/4")
          .expect(200)
          .send({ inc_votes: 1 })
          .then(response => {
            expect(response.body.comment.votes).to.equal(-99);
          });
      });
      it("PATCH 200: sends back the unchanged commen when no inc_votes property", () => {
        return request(app)
          .patch("/api/comments/3")
          .expect(200)
          .send({ in_votes: 2 })
          .then(response => {
            expect(response.body.comment.votes).to.equal(100);
          });
      });
      it("PATCH ERROR 404: should return correct error when patch contains a valid but non existent id", () => {
        return request(app)
          .patch("/api/comments/1001")
          .send({ inc_votes: 2 })
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("Invalid Comment Id");
          });
      });
      it("DELETE 204: should give a 204 no content when comment is deleted by id", () => {
        return request(app)
          .delete("/api/comments/2")
          .expect(204);
      });
      it('PATCH ERROR: 400 correct message when inc_votes is included, but as a invalid value (i.e. "string")', () => {
        return request(app)
          .patch("/api/comments/4")
          .expect(400)
          .send({ inc_votes: "UpVote" })
          .then(res => {
            expect(res.body.msg).to.equal("Invalid inc_votes value");
          });
      });
      it("DELETE ERROR 404: Should give correct error when passed a valid, but non-existent comment_id", () => {
        return request(app)
          .delete("/api/comments/53")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.equal("Comment Does Not Exist");
          });
      });
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["get", "put", "post"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/comments/1")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
      it("INVALID METHODS: STATUS 405", () => {
        const invalidMethods = ["delete", "put", "post", "patch"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method is not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
});
