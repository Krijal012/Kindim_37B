import express from "express";
import { verifyTokenMiddleware } from "../Middleware/authMiddleware.js";
import {
    askQuestion,
    answerQuestion,
    getQuestionsByProduct,
    getQuestionsForSeller
} from "../Controller/questionController.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, askQuestion);
router.put("/:id/answer", verifyTokenMiddleware, answerQuestion);
router.get("/product/:productId", getQuestionsByProduct);
router.get("/seller", verifyTokenMiddleware, getQuestionsForSeller);

export default router;
