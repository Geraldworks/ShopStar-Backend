import dotenv from "dotenv";

const envType = process.env.NODE_ENV ?? "test";
const envFile = `.env.${envType}`;

dotenv.config({ path: envFile });
