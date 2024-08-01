import { type Listing as PrismaListingModel } from "@prisma/client";

import db from "../utils/db";

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

export default { getAll };
