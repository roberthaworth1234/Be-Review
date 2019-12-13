const connection = require("../db/connection");
const { checkExists } = require("../models/utilModel");

const fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id)
    .then(result => {
      if (!result.length)
        return Promise.reject({ status: 404, msg: "article does not exist" });
      else {
        return result[0];
      }
    });
};

const updateArticleById = (article_id, value = 0) => {
  if (typeof value === "string")
    return Promise.reject({ status: 400, msg: "Invalid inc_votes value" });
  else {
    return connection("articles")
      .where("articles.article_id", "=", article_id)
      .increment("votes", value)
      .returning("*")
      .then(result => {
        return result[0];
      });
  }
};

const addCommentByArticleId = (article_id, postValue) => {
  const { username, body } = postValue;
  return connection("comments")
    .insert([{ author: username, body: body, article_id: article_id }])
    .returning("*")
    .then(result => {
      return result[0];
    });
};

const fetchCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order
) => {
  if (order !== "asc") order = "desc";
  return connection("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .then(result => {
      if (!result.length)
        return checkExists((author = 0), (topic = 0), article_id);
      return result;
    });
};

const fetchArticles = (sort_by = "created_at", order, author, topic) => {
  if (order !== "asc") order = "desc";
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where("articles.topic", "=", topic);
    })
    .then(result => {
      if (!result.length) return checkExists(author, topic);
      return result;
    });
};

module.exports = {
  fetchArticleById,
  updateArticleById,
  addCommentByArticleId,
  fetchCommentsByArticleId,
  fetchArticles
};
