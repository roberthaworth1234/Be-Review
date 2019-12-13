const articleRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/article-c");
const { methodNotAllowed } = require("../controllers/methodNotAllowed-c");

articleRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(methodNotAllowed);

articleRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all(methodNotAllowed);

module.exports = articleRouter;
