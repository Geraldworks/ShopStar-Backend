import { type User as PrismaUserModel } from "@prisma/client";
import { type z } from "zod";

import { type CreateUserSchema, type LoginUserSchema } from "../schemas/userSchema";

export type PrismaUser = Omit<PrismaUserModel, "id">;
export type PrismaUserPasswordHash = Pick<PrismaUserModel, "passwordHash">;
export type PrismaNonSensitiveUser = Omit<PrismaUserModel, "id" | "passwordHash">;
export type ZodCreateUserPayload = z.infer<typeof CreateUserSchema>;
export type ZodLoginUserPayload = z.infer<typeof LoginUserSchema>;
