const connection = require('../db/connection')

const fetchArticleById = (article_id) => {
  return connection('articles').where('article_id', "=", article_id).returning().then((result) => {
    if (!result.length) return Promise.reject({ status: 404, msg: "article does not exist" })
    else {
      return result;
    }
  })
}

const updateArticleById = (article_id, body) => {
  return connection('articles').where("article_id", "=", article_id).update(body).returning()
}

module.exports = { fetchArticleById, updateArticleById };