import { type User as PrismaUserModel } from "@prisma/client";
import brcypt from "bcrypt";

import { type PrismaNonSensitiveUser, type ZodCreateUserPayload } from "../types/userTypes";
import db from "../utils/db";

const getAll = async (): Promise<PrismaNonSensitiveUser[]> => {
  return await db.user.findMany();
};

const getOne = async (username: string): Promise<PrismaUserModel> => {
  const userFromDb = await db.user.findUniqueOrThrow({
    where: {
      username
    }
  });
  return userFromDb;
};

const createUser = async (userPayload: ZodCreateUserPayload): Promise<PrismaNonSensitiveUser> => {
  const hashedPassword = await brcypt.hash(userPayload.password, 10);
  const userToDb = {
    firstName: userPayload.firstName,
    lastName: userPayload.lastName,
    email: userPayload.email,
    username: userPayload.username,
    passwordHash: hashedPassword
  };
  const userFromDb = await db.user.create({ data: userToDb });
  const { id, passwordHash, ...safeUserCreds } = userFromDb;
  return safeUserCreds;
};

export default { getAll, getOne, createUser };
