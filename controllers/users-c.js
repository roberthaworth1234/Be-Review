const fetchUserByUsername = require('../models/users-m');

exports.getUserbyUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user })
    }).catch((err) => {
      next(err)
    })
}