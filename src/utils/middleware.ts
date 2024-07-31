import { type NextFunction, type Request, type Response } from "express";

export const customErrorHandler = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(err);
};

export const tokenExtractor = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.get("authorization");

  let token;

  if (authorization != null) {
    token = authorization?.startsWith("Bearer ") ? authorization.replace("Bearer ", "") : "";
  } else {
    token = "";
  }

  req.body.token = token;

  next();
};
