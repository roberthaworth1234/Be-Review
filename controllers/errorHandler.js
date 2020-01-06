exports.statusErrorHandler = (err, req, res, next) => {
  if (err.status) return res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
};

exports.psqlErrorHandler = (err, req, res, next) => {
  const errorRef = {
    "23503": [400, "User Invalid"],
    "22P02": [400, "Invalid id"],
    "23502": [400, "Invalid Post Input"],
    "42703": [400, "Query Request Invalid"]
  };

  if (err.code) {
    res.status(errorRef[err.code][0]).send({ msg: errorRef[err.code][1] });
  } else next(err);
};

exports.internalServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
