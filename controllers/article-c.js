const { fetchArticleById, updateArticleById, addCommentByArticleId } = require('../models/article-m');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params
  fetchArticleById(article_id).then((article) => {
    res.status(200).send({ article })
  }).catch((err) =>
    next(err))
}

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes).then((article) => {
    res.status(200).send({ article })
  }).catch((err) => {
    next(err)
  })
}

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  addCommentByArticleId(article_id, req.body).then((comment) => {
    res.status(201).send({ comment })
  }).catch((err) => {
    next(err)
  })
}