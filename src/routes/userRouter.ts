/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import userService from "../services/userService";
import { toValidUserDetails } from "../utils/userUtils";
import { ValidationError } from "zod-validation-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = Router();

router.get("/", (_req, res) => {
  void (async () => {
    try {
      // modify what people see in the api
      const users = await userService.getAll();
      res.json(users);
    } catch (e: unknown) {
      res.json({
        message: "an error occurred when retrieving all users"
      });
    }
  })();
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
