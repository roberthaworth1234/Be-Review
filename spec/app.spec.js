process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
const app = require("../app");
const connection = require('../db/connection')

describe('app', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy())

  describe('/api', () => {
    describe('/topics', () => {
      it('GET: 200 should return correct status and the topics', () => {
        return request(app).get("/api/topics").expect(200).then((response) => {
          expect(response.body.topics[0]).to.have.keys(['slug', 'description'])
          expect(response.body.topics.length).to.equal(3)
        })

      });
      it('GET ERROR:404 should give correct 404 error when topics spelt incorrectly', () => {
        return request(app).get('/api/topisc').expect(404).then((response) => {
          expect(response.body.msg).to.equal('Not Found')
        })
      })
    });
    describe('/users/:username', () => {
      it('GET: 200 should get individual users by username', () => {
        return request(app).get('/api/users/butter_bridge').expect(200).then((response) => {
          expect(response.body.user[0]).to.eql({
            username: 'butter_bridge',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            name: 'jonny'
          })
        })
      });
      it('GET ERROR:404 sends appropriate error message when given a valid but non-existent username', () => {
        return request(app).get('/api/users/butter_bob').expect(404).then((response) => {
          expect(response.body.msg).to.equal("username does not exist")
        })
      })
    });
    describe('articles', () => {
      it('GET: 200 should give correct status msg and response when getting articles by id', () => {
        return request(app).get('/api/articles/1').expect(200)
          .then((response) => {
            expect(response.body.article[0]).to.eql({
              article_id: 1,
              title: 'Living in the shadow of a great man',
              topic: 'mitch',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              created_at: '2018-11-15T12:21:54.171Z',
              votes: 100,
            })
          })
      });
      it('GET ERROR: 404 sends an appropirate message when a valid but non-existent id is used', () => {
        return request(app).get('/api/articles/911').expect(404).then((response) => {
          expect(response.body.msg).to.equal("article does not exist")
        })
      });
      it('GET ERROR: 400 sends an appropriate message when an invalid id is used', () => {
        return request(app).get('/api/articles/my-special-article').expect(400).then((response) => {
          expect(response.body.msg).to.equal("Invalid id");
        })
      })
      it('PATCH: 202 updates an article and return the response updated article with the correct message', () => {
        return request(app).patch("/api/articles/3").send({
          article_id: 3,
          title: 'Eight pug gifs that remind me of mitch',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Everything I have changed in this file is in the body',
          created_at: new Date(1289996514171),
        }).expect(200).then((response) => {
          expect(response.body.updatedOwner).to.eql({
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'Everything I have changed in this file is in the body',
            created_at: '2010-11-17T12:21:54.171Z',
          })
        })
      })
    });
  });
})