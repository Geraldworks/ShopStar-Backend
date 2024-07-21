import axios from "axios";
import { Router } from "express";

const baseUrl = "https://6698c8c52069c438cd6ffca8.mockapi.io/api";

const router = Router();

router.get("/", (_req, res) => {
  void (async () => {
    try {
      const products = await axios.get(baseUrl + "/listings");
      res.status(200).json(products.data);
    } catch (err) {
      res.status(404).json({ message: "encountered an error" });
    }
  })();
});

export default router;
