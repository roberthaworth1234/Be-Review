const userRouter = require("express").Router();
const { getUserbyUsername } = require("../controllers/users-c");
const { methodNotAllowed } = require("../controllers/methodNotAllowed-c");

userRouter
  .route("/:username")
  .get(getUserbyUsername)
  .all(methodNotAllowed);

module.exports = userRouter;
