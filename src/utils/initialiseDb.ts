import userService from "../services/userService";
import db from "./db";

const listings = [
  {
    createdAt: "2024-07-31T15:58:07.864Z",
    title: "Investor Operations Executive",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "Ab aliquam blanditiis accusantium praesentium deleniti.",
    price: 43606
  },
  {
    createdAt: "2024-07-31T13:52:41.360Z",
    title: "Corporate Assurance Coordinator",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "totam quos repellat",
    price: 10310
  },
  {
    createdAt: "2024-07-31T16:00:40.983Z",
    title: "Product Interactions Strategist",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "Ratione ea dolorum vitae tempora ullam quo.",
    price: 93759
  },
  {
    createdAt: "2024-07-31T08:50:12.187Z",
    title: "Legacy Creative Administrator",
    listingImage: "https://loremflickr.com/640/480/cats",
    description:
      "Sit est iste omnis ad. Quaerat suscipit porro molestiae eligendi nostrum optio est fugiat animi. Dolor beatae voluptate minus optio.",
    price: 13515
  },
  {
    createdAt: "2024-08-01T00:26:25.174Z",
    title: "International Usability Liaison",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "veritatis suscipit ullam",
    price: 94446
  },
  {
    createdAt: "2024-07-31T06:50:30.908Z",
    title: "International Optimization Assistant",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "tempore nisi provident",
    price: 13264
  },
  {
    createdAt: "2024-08-01T06:05:08.192Z",
    title: "International Applications Producer",
    listingImage: "https://loremflickr.com/640/480/cats",
    description:
      "Id impedit officia cupiditate vero. Necessitatibus harum ea eius officia praesentium magnam. Esse aperiam velit eum a id. Illo nemo tenetur. Necessitatibus rerum quas.",
    price: 98617
  },
  {
    createdAt: "2024-08-01T01:35:55.198Z",
    title: "Direct Tactics Orchestrator",
    listingImage: "https://loremflickr.com/640/480/cats",
    description:
      "Sit nostrum enim repellendus earum. Occaecati perspiciatis praesentium consequatur nemo exercitationem cumque animi odit ratione. Adipisci distinctio omnis vitae cupiditate. Magnam culpa aut doloribus ipsa sint fugiat. Repudiandae hic facere quia pariatur reprehenderit corrupti laboriosam nihil debitis. Eveniet enim expedita et voluptatum magni ex cumque architecto et.",
    price: 67525
  },
  {
    createdAt: "2024-08-01T03:42:27.655Z",
    title: "Corporate Data Technician",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "consectetur sunt minus",
    price: 19178
  },
  {
    createdAt: "2024-07-31T08:35:48.227Z",
    title: "Customer Data Executive",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "In maiores atque qui perspiciatis sapiente dolor.",
    price: 30283
  },
  {
    createdAt: "2024-08-01T00:04:20.123Z",
    title: "Dynamic Paradigm Producer",
    listingImage: "https://loremflickr.com/640/480/cats",
    description:
      "Reiciendis assumenda dicta ab reprehenderit nisi. Architecto adipisci fugiat soluta pariatur similique porro sint tempora. Aliquid minus sunt maxime quisquam delectus. Expedita esse ducimus minus molestiae eius reiciendis alias.",
    price: 37981
  },
  {
    createdAt: "2024-07-31T08:35:07.938Z",
    title: "District Interactions Engineer",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "Laborum quasi veniam occaecati iure mollitia alias qui.",
    price: 5185
  },
  {
    createdAt: "2024-08-01T05:52:42.955Z",
    title: "District Intranet Designer",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "quasi",
    price: 41397
  },
  {
    createdAt: "2024-07-31T22:36:53.152Z",
    title: "Customer Implementation Representative",
    listingImage: "https://loremflickr.com/640/480/cats",
    description: "Molestiae tempore amet sequi qui.",
    price: 21541
  },
  {
    createdAt: "2024-07-31T17:09:46.647Z",
    title: "Senior Operations Consultant",
    listingImage: "https://loremflickr.com/640/480/cats",
    description:
      "Quasi similique error eaque iure quas sapiente non dolore modi. Maxime nam repudiandae explicabo veritatis. Eligendi eum vel ea ipsa hic temporibus nam earum vel. Maxime non ex.\nQuasi ipsa facere voluptatibus animi repellat quaerat molestias ea ducimus. Impedit adipisci quis iure doloremque. Deleniti fugiat illo quasi quos nihil neque nam nulla.\nSuscipit similique debitis quidem vitae similique eaque ullam qui. Dolorum ad aliquam a quas magnam. Nulla consequatur quisquam alias beatae incidunt sint perferendis dolores sit. Molestias nisi possimus dolores. Suscipit nisi voluptatem quae reprehenderit reprehenderit.",
    price: 66820
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
