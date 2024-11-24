const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    player: String,
    team: String,
    matches: Number,
    runs: Number,
    season: String,
    category: String // e.g., "Most Runs", "Most Fours"
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
