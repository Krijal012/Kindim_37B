import express from "express";
import { notFoundRoute } from "./Routes/notFoundRoute.js";
import { errorHandler } from "./Security/errorHandler.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

app.use("/api/auth",authRoutes)

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});