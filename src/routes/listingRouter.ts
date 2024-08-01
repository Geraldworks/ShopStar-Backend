import { Router } from "express";

import listingService from "../services/listingService";

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

export default router;
