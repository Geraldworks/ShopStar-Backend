/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Router } from "express";
import { ValidationError } from "zod-validation-error";

import listingService from "../services/listingService";
import { tokenExtractor, userExtractor } from "../utils/middleware";
import { toValidListingPayload } from "../validation/listingValidation";

const router = Router();

router.get("/", (_req, res) => {
  void (async () => {
    try {
      const listings = await listingService.getAll();
      res.status(200).json(listings);
    } catch (err) {
      res.status(404).json({ message: "encountered an error" });
    }
  })();
});

router.get("/search", (req, res, next) => {
  const { title = "", username = "" } = req.query;
  void (async () => {
    try {
      if (typeof title === "string" && typeof username === "string") {
        if (username === "") {
          const listings = await listingService.getAll({ title });
          res.status(200).json(listings);
        } else {
          const listings = await listingService.getAll({ username, title });
          res.status(200).json(listings);
        }
      } else {
        const listings = await listingService.getAll();
        res.status(200).json(listings);
      }
    } catch (err: unknown) {
      console.log(err);
      next();
    }
  })();
});

router.get("/:id", (req, res) => {
  const listingId = Number(req.params.id);
  void (async () => {
    try {
      const listing = await listingService.getOne(listingId);
      res.status(200).json(listing);
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
        res.status(404).json({ message: err.message });
      }
    }
  })();
});

router.post("/", tokenExtractor, userExtractor, async (req, res, next) => {
  const listingPayload = req.body.data;
  const username: string = req.body.user.username;
  try {
    const validListing = toValidListingPayload(listingPayload);
    const listingToDb = {
      ...validListing,
      username,
      listingImage: "https://picsum.photos/222/166" // randomly generated for completion sake
    };
    const newListing = await listingService.createOne(listingToDb);
    res.status(201).json(newListing);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.put("/:id", tokenExtractor, userExtractor, async (req, res, next) => {
  const listingId = Number(req.params.id);
  const updatedListingPyaload = req.body.data;
  try {
    const validListing = toValidListingPayload(updatedListingPyaload);
    const updatedListing = await listingService.updateOne(validListing, listingId);
    res.status(200).json(updatedListing);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.delete("/:id", tokenExtractor, userExtractor, async (req, res, next) => {
  const listingId = Number(req.params.id);
  console.log(listingId);
  try {
    await listingService.deleteOne(listingId);
    res.status(204).json({ message: "successfully deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
