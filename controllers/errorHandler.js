exports.statusErrorHandler = (err, req, res, next) => {
  if (err.status) return res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "23503" && err.length === 262) {
    res.status(400).send({ msg: "User Invalid" });
  } else if (err.code === "23503" && err.length === 273) {
    res.status(400).send({ msg: "Article Id Invalid" });
  } else if (err.code === "23503" && err.length === 275) {
    res.status(404).send({ msg: "Article Id Invalid" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid id" });
  } else if (err.code === "23502" && (err.length === 220 || 221)) {
    res.status(400).send({ msg: "Invalid Post Input" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "Query Request Invalid" });
  } else if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else res.status(500).send({ msg: "Internal Server Error" });
};
