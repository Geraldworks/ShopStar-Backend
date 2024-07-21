import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import brcypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "zod-validation-error";

import userService from "../services/userService";
import { toValidUserLoginDetails } from "../utils/userUtils";

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/", async (req, res, next) => {
  try {
    const validLoginDetails = toValidUserLoginDetails(req.body);
    const userFromDb = await userService.getOne(validLoginDetails.username);
    const passwordCorrect = await brcypt.compare(
      validLoginDetails.password,
      userFromDb.passwordHash
    );

    if (!passwordCorrect) {
      res.status(401).json({ message: "incorrect password" });
    } else {
      const userForToken = {
        username: userFromDb.username,
        id: userFromDb.id
      };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const token = jwt.sign(userForToken, process.env.SECRET!, { expiresIn: 60 * 60 * 6 });
      res.status(200).json({ token });
    }
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: "please provide both your username and password" });
    } else if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      res
        .status(404)
        .json({ message: "Username does not exist in database. Please create an account" });
    } else {
      next(err);
    }
  }
});

export default router;
