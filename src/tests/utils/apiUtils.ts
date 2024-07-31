import { type Application, type Router } from "express";
import express from "express";

export const createIsolatedApp = (route: string, router: Router): Application => {
  const app = express();

  app.use(route, router);

  return app;
};
