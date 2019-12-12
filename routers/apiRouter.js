const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentsRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
