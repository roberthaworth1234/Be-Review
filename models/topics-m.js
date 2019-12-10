
const connection = require('../db/connection')

const fetchTopics = () => {
  return connection.select().from('topics').returning()

};

module.exports = fetchTopics;