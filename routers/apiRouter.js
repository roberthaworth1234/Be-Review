const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentsRouter");
const { getApi } = require("../controllers/api-c");
const { methodNotAllowed } = require("../controllers/methodNotAllowed-c");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter
  .route("/")
  .get(getApi)
  .all(methodNotAllowed);

module.exports = apiRouter;
