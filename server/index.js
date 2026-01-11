import express from "express";
import { connection } from "./Database/db.js";
import { authRouter } from "./Routes/authRoutes.js"; 
import rewardRoutes from "./Routes/rewardRoutes.js";

import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors()); 


connection();


app.use("/api/auth", authRouter);
app.use("/api/rewards", rewardRoutes);

app.get("/", (req, res) => res.send("Auth API is running"));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

