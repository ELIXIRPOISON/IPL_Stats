const mongoose = require("mongoose");
const Player = require("./models/player");
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/iplStats", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const data = JSON.parse(fs.readFileSync("../data/most_runs.json", "utf-8"));

const saveData = async () => {
    try {
        await Player.insertMany(data);
        console.log("Data saved to MongoDB!");
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
};

saveData();
