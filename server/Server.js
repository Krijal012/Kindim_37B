<<<<<<< HEAD

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

=======
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
>>>>>>> 89a68f35aacc025c3924294389bccd59180a59c0
