const userRouter = require('express').Router();
const { getUserbyUsername } = require('../controllers/users-c');

userRouter.route('/:username').get(getUserbyUsername);

module.exports = userRouter;