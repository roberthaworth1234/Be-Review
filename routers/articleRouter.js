const articleRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/article-c");

articleRouter.route("/").get(getArticles);

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articleRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articleRouter;
