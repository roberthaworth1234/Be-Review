const { fetchArticleById, updateArticleById } = require('../models/article-m');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params
  fetchArticleById(article_id).then((article) => {
    res.status(200).send({ article })
  }).catch((err) =>
    next(err))
}

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  updateArticleById(article_id, req.body).then((updatedOwner) => {
    res.status(200).send({ updatedOwner: req.body })
  }).catch((err) => {
    next(err)
  })
}