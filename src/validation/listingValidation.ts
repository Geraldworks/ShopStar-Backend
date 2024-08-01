import { CreateListingSchema } from "../schemas/listingSchema";
import { type ZodCreateListingPayload } from "../types/listingTypes";
import { schemaValidator } from "./validationUtils";

const toValidListingPayload = schemaValidator<ZodCreateListingPayload>(CreateListingSchema);

export { toValidListingPayload };
