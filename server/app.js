import fs from "fs";
import createError from "http-errors";
import cors from "cors";
import express from "express";
import articlesRouter from "./routes/articles.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

const app = express();

app.use(cors());
app.disable("x-powered-by");

app.use(express.json());

app.use("/articles", articlesRouter);

// swagger
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.json({
    status,
    detail: err.message,
    instance: req.url,
  });
});

export default app;
