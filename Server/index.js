require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getReviews, addReview } = require("./queries");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("AI Resume Optimizer API is running");
});

app.get("/reviews", getReviews);
app.post("/reviews", addReview);

// Start server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

