const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter')

apiRouter.use("/topics", topicsRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/articles", articleRouter);

module.exports = apiRouter;
