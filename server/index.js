// index.js
import app from "./app.js";
import { CustomError } from "./src/utils/CustomError.js";
import db from "./src/db/db.js";

const port = process.env.PORT || 5001;

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err);
  throw new CustomError(`Unable to start server ${err}`, 500);
});

db();

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${port}`);
  } else {
    throw new CustomError(
      `Server doesn't get any port number. Please check your connection.`,
      501
    );
  }
});
