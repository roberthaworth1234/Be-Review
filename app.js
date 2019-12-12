const express = require("express");
const app = express();
const apiRouter = require("./routers/apiRouter");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status) return res.status(err.status).send({ msg: err.msg });
  else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (
    err.code === "23503" &&
    err.detail === 'Key (author)=(bobbio) is not present in table "users".'
  ) {
    res.status(400).send({ msg: "User Invalid" });
  } else if (
    err.code === "23503" &&
    err.detail === 'Key (article_id)=(15) is not present in table "articles".'
  ) {
    res.status(400).send({ msg: "Article Id Invalid" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid id" });
  } else if ((err.code = "42703")) {
    res.status(400).send({ msg: "Query Request Invalid" });
  } else if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else console.log(err);
});

module.exports = app;
