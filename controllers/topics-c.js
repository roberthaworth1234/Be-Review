const fetchTopics = require('../models/topics-m')

exports.getTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics })
  }).catch((err) => {
    next(err)
  })
}