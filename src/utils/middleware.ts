import { type NextFunction, type Request, type Response } from "express";

const customErrorHandler = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(err);
};

export default {
  customErrorHandler
};
