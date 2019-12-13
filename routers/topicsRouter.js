const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-c");
const { methodNotAllowed } = require("../controllers/methodNotAllowed-c");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
