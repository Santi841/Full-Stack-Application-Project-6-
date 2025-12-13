// Client/src/App.jsx
import { useEffect, useState } from 'react';
import { fetchReviews, createReview } from './api';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    resume_text: '',
    job_description: '',
  });

  // Load existing reviews on mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError('Could not load reviews from the server.');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // basic validation
    if (!form.name || !form.email || !form.resume_text || !form.job_description) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    try {
      setSubmitting(true);

      // In the future this could come from AI; for now, placeholder values:
      const payload = {
        ...form,
        ai_feedback: 'Example AI feedback: this would come from an AI model.',
        ai_score: 85,
      };

      const newReview = await createReview(payload);

      setReviews((prev) => [newReview, ...prev]);
      setSuccess('Resume review saved successfully!');
      setForm({
        name: '',
        email: '',
        resume_text: '',
        job_description: '',
      });
    } catch (err) {
      console.error(err);
      setError('There was a problem submitting your resume.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Resume Optimizer</h1>
        <p className="app-tagline">
          Paste your resume & job description, then track AI-powered feedback over time.
        </p>
      </header>

      <main className="layout">
        {/* Left: Form */}
        <section className="panel">
          <h2>New Resume Review</h2>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form onSubmit={handleSubmit} className="form">
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Santiago Garcia"
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="resume_text">Resume Text</label>
              <textarea
                id="resume_text"
                name="resume_text"
                rows={6}
                value={form.resume_text}
                onChange={handleChange}
                placeholder="Paste your resume here..."
              />
            </div>

            <div className="field">
              <label htmlFor="job_description">Job Description</label>
              <textarea
                id="job_description"
                name="job_description"
                rows={4}
                value={form.job_description}
                onChange={handleChange}
                placeholder="Paste the job description here..."
              />
            </div>

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Save Review'}
            </button>
          </form>
        </section>

        {/* Right: Reviews list */}
        <section className="panel">
          <h2>Previous Reviews</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet. Submit one on the left!</p>
          ) : (
            <ul className="reviews-list">
              {reviews.map((review) => (
                <li key={review.id} className="review-card">
                  <div className="review-header">
                    <div>
                      <h3>{review.name}</h3>
                      <p className="review-email">{review.email}</p>
                    </div>
                    {review.ai_score != null && (
                      <span className="score-pill">
                        Score: {review.ai_score}/100
                      </span>
                    )}
                  </div>

                  <div className="review-section">
                    <h4>Resume</h4>
                    <p>{review.resume_text}</p>
                  </div>

                  <div className="review-section">
                    <h4>Job Description</h4>
                    <p>{review.job_description}</p>
                  </div>

                  {review.ai_feedback && (
                    <div className="review-section">
                      <h4>AI Feedback</h4>
                      <p>{review.ai_feedback}</p>
                    </div>
                  )}

                  {review.created_at && (
                    <p className="review-meta">
                      Created at:{' '}
                      {new Date(review.created_at).toLocaleString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
