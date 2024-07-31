import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import userService from "../../services/userService";
import { type ZodCreateUserPayload } from "../../types/userTypes";
import db from "../../utils/db";

const createUserOne: ZodCreateUserPayload = {
  firstName: "prisma1",
  lastName: "prisma1",
  email: "prisma1@gmail.com",
  username: "prisma1",
  password: "prisma1"
};

const createUserTwo: ZodCreateUserPayload = {
  firstName: "prisma2",
  lastName: "prisma2",
  email: "prisma2@gmail.com",
  username: "prisma2",
  password: "prisma2"
};

beforeEach(async () => {
  await db.user.deleteMany();
});

afterEach(async () => {
  await db.user.deleteMany();
});

describe("when database is empty", () => {
  it("creating first new user is successful", async () => {
    await userService.createUser(createUserOne);

    const user = await db.user.findUnique({
      where: {
        username: "prisma1"
      }
    });

    expect(user).not.toBeNull();
  });

  describe("when a user already exists", () => {
    beforeEach(async () => {
      await userService.createUser(createUserOne);
    });

    it("getting the single user is successful", async () => {
      const user = await userService.getOne("prisma1");

      expect(user).not.toBeNull();
      expect(user).toHaveProperty("email", "prisma1@gmail.com");
    });

    it("creating same user throw error", async () => {
      await expect(userService.createUser(createUserOne)).rejects.toThrow(
        PrismaClientKnownRequestError
      );
    });

    it("creating second new user succeeds", async () => {
      await userService.createUser(createUserTwo);

      const user = await db.user.findUnique({
        where: {
          username: "prisma2"
        }
      });

      expect(user).not.toBeNull();
    });
  });
});
