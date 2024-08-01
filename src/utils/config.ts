import dotenv from "dotenv";

// import { initialise } from "./initialiseDb";

const envType = process.env.NODE_ENV ?? "test";
const envFile = `.env.${envType}`;

// if (envType === "dev") {
//   void (async () => {
//     await initialise();
//   })();
// }

dotenv.config({ path: envFile });
