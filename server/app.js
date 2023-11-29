// app.js
import express from "express";
import "dotenv/config";
import route from "./src/route/routes.js";


const app = express();


app.use((err, req, res, next) => {
  console.error(err);
  throw new CustomError(`Unable to start server ${err}`, 500);
});

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/v1",route);

export default app;
