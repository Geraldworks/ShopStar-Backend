import cors from "cors";
import express, { json } from "express";

import loginRouter from "./routes/loginRouter";
import productRouter from "./routes/productRouter";
import userRouter from "./routes/userRouter";
import { customErrorHandler } from "./utils/middleware";

const app = express();

app.use(cors());
app.use(json());

app.get("/", (_req, res) => {
  res.send("hello world");
});

app.get("/api/health", (_req, res) => {
  res.send("ShopStar backend API is functional");
});

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(customErrorHandler);

export default app;
