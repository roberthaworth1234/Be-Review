NODE_ENV = 'test';
const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it("should return an object when passed an array containing a object", () => {
    const expected = new Date(1236557891);
    expect(formatDates([1236557891])).to.be.an("array")
    expect(typeof formatDates([1236557891])[0]).to.equal('object')
  });
  it("should return a date object in array when provdided an number array", () => {
    const expected = new Date(1542284514171)
    expect(formatDates([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }])).to.eql([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: expected,
      votes: 100,
    }])
  })
  it("should return an array of date objects with a list of various numbers", () => {
    const input = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }, { created_at: 45678910 }]
    const expected = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: new Date(1542284514171),
      votes: 100
    }, { created_at: new Date(45678910) }]
    expect(formatDates(input)).to.eql(expected)
  });
  it('should not mutate the array or the objects within array', () => {
    const input = [{
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    },
    {
      title: 'Student SUES Mitch!',
      topic: 'mitch',
      author: 'rogersop',
      body:
        'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
      created_at: 1163852514171,
    }];
    const control = [{
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    },
    {
      title: 'Student SUES Mitch!',
      topic: 'mitch',
      author: 'rogersop',
      body:
        'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
      created_at: 1163852514171,
    }];
    const expected = [{
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: new Date(1289996514171),
    },
    {
      title: 'Student SUES Mitch!',
      topic: 'mitch',
      author: 'rogersop',
      body:
        'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
      created_at: new Date(1163852514171),
    }]
    expect(formatDates(input)).to.eql(expected);
    expect(input).to.not.equal(control);
    expect(input[0]).to.not.equal(control[0])
  })

});


describe('makeRefObj', () => {
  it("should return an object when passed an array", () => {
    const input = [];
    const expected = {};
    expect(makeRefObj(input)).to.eql(expected)
  })
  it('should return a object with key of author and value of id when passed an array of one object', () => {
    const input = [{
      comment_id: 1,
      author: 'butter_bridge',
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    }];
    const expected = { butter_bridge: 1 };
    expect(makeRefObj(input, 'created_by', 'comment_id')).to.eql(expected)
  })
  it('should take an array list of atleast 3 objects and return the correct (passed) key value pairs as a new object', () => {
    const input = [{
      article_id: 19,
      title: 'Who are the most followed clubs and players on Instagram?',
      body:
        'Manchester United',
      votes: 0,
      topic: 'football',
      author: 'jessjelly',
      created_at: 12
    },
    {
      article_id: 20,
      title: 'History of Football',
      body:
        'It may come history.',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 12
    },
    {
      article_id: 21,
      title: 'Agility Training Drills For Football Players',
      body:
        'The following guide explains how to use both pieces of equipment effectively:',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 14
    }];
    const expected = {
      'Who are the most followed clubs and players on Instagram?': 19, 'History of Football': 20, 'Agility Training Drills For Football Players': 21
    };
    expect(makeRefObj(input, 'title', 'article_id')).to.eql(expected)
  })
  it('should not mutate the original array or nested objects and create a new object', () => {
    const input = [{
      article_id: 20,
      title: 'History of Football',
      body:
        'It may come history.',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 12
    },
    {
      article_id: 21,
      title: 'Agility Training Drills For Football Players',
      body:
        'The following guide explains how to use both pieces of equipment effectively:',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 14
    }];
    const control = [{
      article_id: 20,
      title: 'History of Football',
      body:
        'It may come history.',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 12
    },
    {
      article_id: 21,
      title: 'Agility Training Drills For Football Players',
      body:
        'The following guide explains how to use both pieces of equipment effectively:',
      votes: 0,
      topic: 'football',
      author: 'tickle122',
      created_at: 14
    }];
    const expected = { 'History of Football': 20, 'Agility Training Drills For Football Players': 21 };
    expect(makeRefObj(input, 'title', 'article_id')).to.eql(expected);
    expect(input[1]).to.not.equal(control[1]);
    expect(input).to.not.equal(control)
  })
});

describe('formatComments', () => {
  it('should take an array and return a new array', () => {
    const input = [];
    const expected = [];
    expect(formatComments(input)).to.eql(expected);
  })
  it('should take an array of one object and rename the keys created_by and article_id', () => {
    const input = [{
      comment_id: 1,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,

    }];
    const ref = { 'Making sense of Redux': 4 }
    const expected = [{
      comment_id: 1,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      article_id: 4,
      author: 'grumpy19',
      votes: 7,
      created_at: new Date(1478813209256),
    }];
    expect(formatComments(input, ref)).to.eql(expected)
  })
  it('should take an array containing more than two objects and format the correct keys for each', () => {
    const input = [{
      comment_id: 1,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,

    }, {
      comment_id: 2,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209257,
    }, {
      comment_id: 3,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: '22 Amazing open source React projects',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209257,
    }];
    const ref = { 'Making sense of Redux': 4, "22 Amazing open source React projects": 3 };
    expect(formatComments(input, ref)[1]).to.have.keys('comment_id',
      'body',
      'article_id',
      'author',
      'votes',
      'created_at')
    expect(formatComments(input, ref).length).to.equal(3)
  })
  it('should also pass the cereated_at unix format into a javascirpt object', () => {
    const input = [{
      comment_id: 1,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209257,
    }];
    const ref = { 'Making sense of Redux': 4 }
    const expected = [{
      comment_id: 1,
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      article_id: 4,
      author: 'grumpy19',
      votes: 7,
      created_at: new Date(1478813209257),
    }];
    expect(formatDates(input, ref)[0].created_at).to.eql(expected[0].created_at)
  })
});
