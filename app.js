const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')

app.use(express.json())

app.use("/api", apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: "Not Found" })
})

app.use((err, req, res, next) => {
  // console.log(err.code)
  if (err.code === '22P02') {
    res.status(400).send({ msg: "Invalid id" })
  } else if (err.status) return res.status(err.status).send({ msg: err.msg })
})

module.exports = app;