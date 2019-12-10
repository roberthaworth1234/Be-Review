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
  });
});