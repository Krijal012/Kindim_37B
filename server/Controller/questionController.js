import Question from "../Model/questionModel.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

export const askQuestion = async (req, res) => {
    const { productId, question } = req.body;
    const userId = req.userId;

    try {
        const newQuestion = await Question.create({
            productId,
            userId,
            question
        });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const answerQuestion = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    const sellerId = req.userId;

    try {
        const question = await Question.findByPk(id, {
            include: [{ model: Product }]
        });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the current user is the owner of the product
        if (question.Product.sellerId !== sellerId) {
            return res.status(403).json({ message: "Unauthorized: You do not own this product" });
        }

        question.answer = answer;
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const questions = await Question.findAll({
            where: { productId },
            include: [
                { model: User, attributes: ['username'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuestionsForSeller = async (req, res) => {
    const sellerId = req.userId;

    try {
        const questions = await Question.findAll({
            include: [
                {
                    model: Product,
                    where: { sellerId },
                    attributes: ['id', 'name', 'image']
                },
                { model: User, attributes: ['username'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
