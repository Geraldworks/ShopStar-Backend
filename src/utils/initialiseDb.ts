import userService from "../services/userService";
import db from "./db";

const listings = [
  {
    createdAt: "2002-06-26T00:28:57.438Z",
    title: "Chair",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 464.0
  },
  {
    createdAt: "2060-01-01T06:49:09.805Z",
    title: "Table",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 370.0
  },
  {
    createdAt: "2047-07-21T06:24:46.566Z",
    title: "Chicken",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    price: 227.0
  },
  {
    createdAt: "2091-02-25T11:58:21.827Z",
    title: "Chips",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    price: 953.0
  },
  {
    createdAt: "2054-10-01T07:04:52.834Z",
    title: "Fish",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 405.0
  },
  {
    createdAt: "2010-11-19T11:40:23.047Z",
    title: "Keyboard",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 437.0
  },
  {
    createdAt: "2058-12-05T22:17:46.116Z",
    title: "Bike",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    price: 576.0
  },
  {
    createdAt: "2070-04-14T12:19:05.622Z",
    title: "Cheese",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    price: 121.0
  },
  {
    createdAt: "1996-01-31T23:34:07.547Z",
    title: "Pizza",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 595.0
  },
  {
    createdAt: "2037-08-01T18:49:46.441Z",
    title: "Hat",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    price: 263.0
  },
  {
    createdAt: "2067-12-17T19:25:46.875Z",
    title: "Shirt",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    price: 202.0
  },
  {
    createdAt: "2095-04-27T15:19:07.234Z",
    title: "Gloves",
    listingImage: "https://loremflickr.com/640/480/food",
    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    price: 488.0
  },
  {
    createdAt: "2004-12-24T16:13:39.686Z",
    title: "Bike",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    price: 567.0
  },
  {
    createdAt: "2005-08-05T23:10:58.087Z",
    title: "Chips",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    price: 883.0
  },
  {
    createdAt: "2069-10-13T22:46:50.854Z",
    title: "Bacon",
    listingImage: "https://loremflickr.com/640/480/food",
    description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    price: 675.0
  },
  {
    createdAt: "2034-07-19T22:10:33.512Z",
    title: "Shoes",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    price: 821.0
  },
  {
    createdAt: "2068-02-28T22:29:09.565Z",
    title: "Computer",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    price: 387.0
  },
  {
    createdAt: "1998-03-31T22:44:47.494Z",
    title: "Pants",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    price: 190.0
  },
  {
    createdAt: "2006-10-06T07:15:49.521Z",
    title: "Chips",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    price: 834.0
  },
  {
    createdAt: "2003-02-15T13:22:40.258Z",
    title: "Bike",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    price: 680.0
  },
  {
    createdAt: "2037-12-10T03:28:17.521Z",
    title: "Chair",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    price: 127.0
  },
  {
    createdAt: "1994-10-01T15:39:55.284Z",
    title: "Tuna",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    price: 955.0
  },
  {
    createdAt: "2047-08-30T06:57:32.332Z",
    title: "Bacon",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    price: 218.0
  },
  {
    createdAt: "1998-02-23T11:28:59.911Z",
    title: "Hat",
    listingImage: "https://loremflickr.com/640/480/food",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    price: 590.0
  }
];

export const initialise = async (): Promise<void> => {
  await db.listing.deleteMany({});
  await db.user.deleteMany({});

  // creates one user in the db
  const user = await userService.createUser({
    firstName: "Celine",
    lastName: "Hether",
    email: "celinehether@gmail.com",
    username: "CelineHether",
    password: "CelineHether"
  });

  // adds the records
  await db.user.update({
    where: { username: user.username },
    data: {
      listings: {
        create: listings
      }
    }
  });
};

initialise()
  .then(() => {
    console.log("successfully initialised the database");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to initialize the database", err);
    process.exit(1);
  });
