const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')

app.use("/api", apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: "Not Found" })
})

app.use((err, req, res, next) => {
  console.log(err)
})

module.exports = app;