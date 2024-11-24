const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/iplStats", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use("/api", playerRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
