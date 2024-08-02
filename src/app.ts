import cors from "cors";
import express, { json } from "express";
import path from "path";

import listingRouter from "./routes/listingRouter";
import loginRouter from "./routes/loginRouter";
import userRouter from "./routes/userRouter";
import { customErrorHandler } from "./utils/middleware";

const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

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
app.use("/api/listings", listingRouter);

app.use(customErrorHandler);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

export default app;
