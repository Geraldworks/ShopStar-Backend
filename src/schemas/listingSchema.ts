import { z } from "zod";

export const CreateListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  listingImage: z.string(),
  createdAt: z.string()
});
