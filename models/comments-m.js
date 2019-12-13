const connection = require("../db/connection");

const updateCommentById = (comment_id, value = 0) => {
  if (typeof value === "string")
    return Promise.reject({ status: 400, msg: "Invalid inc_votes value" });
  else {
    return connection
      .select("comments")
      .from("comments")
      .where("comment_id", "=", comment_id)
      .increment("votes", value)
      .returning("*")
      .then(result => {
        if (!result.length)
          return Promise.reject({ status: 404, msg: "Invalid Comment Id" });
        return result[0];
      });
  }
};

const removeCommentById = comment_id => {
  return connection("comments")
    .where("comment_id", comment_id)
    .del()
    .then(result => {
      if (!result)
        return Promise.reject({ status: 404, msg: "Comment Does Not Exist" });
    });
};

module.exports = { updateCommentById, removeCommentById };
