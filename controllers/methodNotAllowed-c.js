exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method is not allowed" });
};
