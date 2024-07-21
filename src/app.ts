import express, { json } from "express";

import loginRouter from "./routes/loginRouter";
import userRouter from "./routes/userRouter";
import middleware from "./utils/middleware";

const app = express();

app.use(json());

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.get("/api/health", (_req, res) => {
  res.send("ShopStar backend API is functional");
});

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

app.use(middleware.customErrorHandler);

export default app;
