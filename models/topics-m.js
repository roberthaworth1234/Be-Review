const connection = require("../db/connection");

const fetchTopics = () => {
  return connection("topics");
};

module.exports = fetchTopics;
