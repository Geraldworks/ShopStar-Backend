import { CreateUserSchema, LoginUserSchema } from "../schemas/userSchema";
import { type ZodCreateUserPayload, type ZodLoginUserPayload } from "../types/userTypes";
import { schemaValidator } from "./validationUtils";

const toValidUserLoginDetails = schemaValidator<ZodLoginUserPayload>(LoginUserSchema);

const toValidUserDetails = schemaValidator<ZodCreateUserPayload>(CreateUserSchema);

// const testValid = schemaValidator<ZodCreateUserPayload>();

export { toValidUserDetails, toValidUserLoginDetails };
