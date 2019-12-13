const articleRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/article-c");

articleRouter
  .route("/")
  .get(getArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articleRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = articleRouter;
