const fetchApi = require("../endpoints.json");

exports.getApi = (req, res, next) => {
  res.status(200).send(fetchApi);
};
