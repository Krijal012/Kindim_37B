import express from "express";
import upload from "../Middleware/upload.js";
import { getProfile, updateProfile ,deleteProfile} from "../Controller/profileController.js";

const router = express.Router();

router.get("/", getProfile);


router.delete("/", deleteProfile);

router.post("/", upload.single("profileImage"), updateProfile);

export default router;
