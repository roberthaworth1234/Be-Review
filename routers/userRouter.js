const userRouter = require("express").Router();
const { getUserbyUsername } = require("../controllers/users-c");

userRouter
  .route("/:username")
  .get(getUserbyUsername)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = userRouter;
