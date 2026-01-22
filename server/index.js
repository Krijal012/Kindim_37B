import express from "express";
import cors from "cors";
import profileRoutes from "./Routes/profile.js";
import { authRouter } from "./Routes/authRoutes.js";
import { connection } from "./Database/db.js";
import { productRouter } from "./Routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


connection();

app.get("/api/test", (req, res) => res.json({ message: "Server works" }));

app.use("/auth", authRouter);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
