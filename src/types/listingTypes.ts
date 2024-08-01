import { type z } from "zod";

import { type CreateListingSchema } from "../schemas/listingSchema";

export type ZodCreateListingPayload = z.infer<typeof CreateListingSchema>;
