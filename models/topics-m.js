
const connection = require('../db/connection')

const fetchTopics = () => {
  return connection('topics').returning()

};

module.exports = fetchTopics;