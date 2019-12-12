const connection = require("../db/connection");

exports.checkExists = (author, topic) => {
  if (author)
    return connection
      .select("username")
      .from("users")
      .where("username", "=", author)
      .then(result => {
        if (!result.length)
          return Promise.reject({
            status: 404,
            msg: "User Not Found"
          });
        else {
          return [];
        }
      });

  if (topic)
    return connection
      .select("slug")
      .from("topics")
      .where("slug", "=", topic)
      .then(result => {
        if (!result.length)
          return Promise.reject({ status: 404, msg: "Topic Not Found" });
        else {
          return [];
        }
      });
};
