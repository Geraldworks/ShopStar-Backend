import { type NextFunction, type Request, type Response } from "express";
import jwt, { JsonWebTokenError, type Secret } from "jsonwebtoken";

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

export const userExtractor = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token: string = req.body.token;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const secret: Secret = process.env.SECRET!;
    const decoded = jwt.verify(token, secret);
    req.body.user = decoded;
  } catch (err: unknown) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token. Please sign in again" });
    }
  }
  next();
};
