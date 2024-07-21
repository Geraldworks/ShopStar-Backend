import { type ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

const schemaValidator =
  <T>(schema: ZodSchema<T, any, any>) =>
  (obj: unknown): T => {
    try {
      const validatedObj = schema.parse(obj);
      return validatedObj;
    } catch (err) {
      const validationError = fromError(err);
      throw validationError;
    }
  };

// const schemaValidator<T extends ZodSchema> = ()

export { schemaValidator };
