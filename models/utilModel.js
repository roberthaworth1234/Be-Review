const connection = require("../db/connection");

exports.checkExists = (author, topic, article_id) => {
  const connectionFunc = (value, table, column) => {
    return connection(table)
      .where(column, "=", value)
      .then(result => {
        if (!result.length)
          return Promise.reject({
            status: 404,
            msg: `${table.substring(0, table.length - 1)} not found`
          });
        else {
          return [];
        }
      });
  };

  if (author) return connectionFunc(author, "users", "username");
  if (topic) return connectionFunc(topic, "topics", "slug");
  if (article_id) return connectionFunc(article_id, "articles", "article_id");
};
