import app from "./app";
import "./utils/envConfig";

// application starts here
const port = process.env.DEFAULT_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listing on PORT ${port}`);
  console.log("server started");
});
