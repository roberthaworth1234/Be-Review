exports.statusErrorHandler = (err, req, res, next) => {
  if (err.status) return res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "23503" && err.length === 275) {
    res.status(404).send(errorRefArr[0]);
  } else if (err.code === "23503" && err.length === 262) {
    res.status(400).send(errorRefArr[1]);
  } else if (err.code === "23503" && err.length === 273) {
    res.status(400).send(errorRefArr[2]);
  } else if (err.code === "22P02") {
    res.status(400).send(errorRefArr[3]);
  } else if (err.code === "23502" && (err.length === 220 || 221)) {
    res.status(400).send(errorRefArr[4]);
  } else if (err.code === "42703") {
    res.status(400).send(errorRefArr[5]);
  } else next(err);
};

exports.internalServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

errorRefArr = [
  { msg: "Article Id Invalid" },
  { msg: "User Invalid" },
  { msg: "Article Id Invalid" },
  { msg: "Invalid id" },
  { msg: "Invalid Post Input" },
  { msg: "Query Request Invalid" }
];
