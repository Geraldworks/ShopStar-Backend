import { schemaValidator } from "./validationUtils";
import { CreateUserSchema, LoginUserSchema } from "../schemas/userSchema";
import { type ZodLoginUserPayload, type ZodCreateUserPayload } from "../types/userTypes";

const toValidUserLoginDetails = schemaValidator<ZodLoginUserPayload>(LoginUserSchema);

const toValidUserDetails = schemaValidator<ZodCreateUserPayload>(CreateUserSchema);

// const testValid = schemaValidator<ZodCreateUserPayload>();

export { toValidUserDetails, toValidUserLoginDetails };
