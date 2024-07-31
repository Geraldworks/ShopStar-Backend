import app from "./app";
import "./utils/config";

// application starts here
const port = process.env.DEFAULT_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server started \nListening on PORT ${port}`);
});
