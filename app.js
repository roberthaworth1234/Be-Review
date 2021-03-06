const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/apiRouter");
const {
  psqlErrorHandler,
  statusErrorHandler
} = require("./controllers/errorHandler");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(statusErrorHandler);

app.use(psqlErrorHandler);

module.exports = app;
