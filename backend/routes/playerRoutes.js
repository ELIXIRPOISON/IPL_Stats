const express = require("express");
const Player = require("../models/player");

const router = express.Router();

// Route to get top 10 players by category and season
router.get("/top-players", async (req, res) => {
    const { season, category } = req.query;

    try {
        const players = await Player.find({ season, category })
            .sort({ runs: -1 })
            .limit(10);
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
