import { CreateUserSchema, LoginUserSchema } from "../schemas/authSchema";
import { type ZodCreateUserPayload, type ZodLoginUserPayload } from "../types/userTypes";
import { schemaValidator } from "./validationUtils";

const toValidUserLoginDetails = schemaValidator<ZodLoginUserPayload>(LoginUserSchema);

const toValidUserDetails = schemaValidator<ZodCreateUserPayload>(CreateUserSchema);

export { toValidUserDetails, toValidUserLoginDetails };
