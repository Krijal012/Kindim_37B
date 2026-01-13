import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./Database/db.js";
import { productRouter } from "./Routes/productRoutes.js";
import { errorHandler } from "./Security/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connection();

// Routes
app.use("/api/products", productRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("Kindim API is running");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});