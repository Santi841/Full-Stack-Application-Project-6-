const { Pool } = require("pg");
require("dotenv").config();

const { Pool } = require("pg");

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;


module.exports = pool;


// GET all resume reviews
const getReviews = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM resume_reviews ORDER BY id ASC");
        res.status(200).json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching resume reviews" });
    }
};

// POST new resume review
const addReview = async (req, res) => {
    const { name, email, resume_text, job_description, ai_feedback, ai_score } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO resume_reviews 
            (name, email, resume_text, job_description, ai_feedback, ai_score)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, email, resume_text, job_description, ai_feedback, ai_score]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error inserting resume review" });
    }
};

module.exports = { getReviews, addReview };
