import express from "express";

const router = express.Router();

router.post("/spin", (req, res) => {
  const rewards = [10, 20, 50, 100];
  const gemsWon = rewards[Math.floor(Math.random() * rewards.length)];

  res.json({
    gemsWon,
    totalGems: 1000 + gemsWon
  });
});

export default router;
