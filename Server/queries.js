const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

// GET all resume reviews
const getReviews = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resume_reviews ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("GET /reviews error:", err);
    res.status(500).json({ error: "Error fetching resume reviews" });
  }
};

// POST new resume review
const addReview = async (req, res) => {
  const {
    name,
    email,
    resume_text,
    job_description,
    ai_feedback,
    ai_score,
  } = req.body;

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
    console.error("POST /reviews error:", err);
    res.status(500).json({ error: "Error inserting resume review" });
  }
};

module.exports = {
  getReviews,
  addReview,
};
