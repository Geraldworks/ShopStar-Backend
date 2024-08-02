import { type Listing as PrismaListingModel } from "@prisma/client";

import { type ZodCreateListingPayload } from "../types/listingTypes";
import db from "../utils/db";

const getOne = async (listingId: number): Promise<PrismaListingModel> => {
  const listing = await db.listing.findUniqueOrThrow({ where: { id: listingId } });
  return listing;
};

interface filterConfig {
  title?: string;
  username?: string;
}

const getAll = async (filters?: filterConfig): Promise<PrismaListingModel[]> => {
  if (filters != null) {
    const listings = await db.listing.findMany({
      where: {
        title: {
          contains: filters.title
        },
        username: filters.username
      }
    });
    return listings;
  } else {
    const listings = await db.listing.findMany({});
    return listings;
  }
};

const createOne = async (
  listingPayload: ZodCreateListingPayload & { username: string }
): Promise<PrismaListingModel> => {
  const listingFromDb = await db.listing.create({ data: listingPayload });
  return listingFromDb;
};

const updateOne = async (
  listingPayload: ZodCreateListingPayload,
  listingId: number
): Promise<PrismaListingModel> => {
  const listingFromDb = await db.listing.update({
    where: {
      id: listingId
    },
    data: listingPayload
  });
  return listingFromDb;
};

const deleteOne = async (listingId: number): Promise<void> => {
  await db.listing.delete({
    where: {
      id: listingId
    }
  });
};

export default { getOne, getAll, createOne, updateOne, deleteOne };
