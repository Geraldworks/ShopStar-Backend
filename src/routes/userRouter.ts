/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Router } from "express";
import { ValidationError } from "zod-validation-error";

import userService from "../services/userService";
import db from "../utils/db";
import { tokenExtractor, userExtractor } from "../utils/middleware";
import { toValidUserDetails } from "../validation/userValidation";

const router = Router();

router.get("/", tokenExtractor, userExtractor, async (req, res, next) => {
  try {
    const userFromDb = await db.user.findUniqueOrThrow({
      where: { username: req.body.user.username }
    });
    const { id, passwordHash, ...userToClient } = userFromDb;
    res.status(200).json(userToClient);
  } catch (err: unknown) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      res.status(404).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  const userPayload = req.body;
  try {
    const validUser = toValidUserDetails(userPayload);
    const newUser = await userService.createUser(validUser);
    res.status(201).json(newUser);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      const duped = err.meta as Record<string, any>;
      res.status(400).json({
        message: `${duped.target} already exists in the database. Please specify another ${duped.target}`
      });
    } else {
      next(err);
    }
  }
});
export default router;
