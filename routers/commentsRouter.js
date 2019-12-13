const commentRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-c");

commentRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = commentRouter;
