# AI Resume Optimizer

A full-stack web application that lets users submit a resume + job description, stores submissions in PostgreSQL, and returns saved reviews through an Express API.  
Frontend built with React (Vite). Backend built with Node/Express. Database hosted on PostgreSQL (local via pgAdmin and production via Render Postgres).

---

## Features
- Submit resume + job description from the frontend
- Save submissions to PostgreSQL
- View previous submissions (GET /reviews)
- Add new submission (POST /reviews)
- Backend deployed on Render
- Frontend deployed on Vercel

---

## Tech Stack
**Frontend:** React + Vite  
**Backend:** Node.js + Express  
**Database:** PostgreSQL  
**Deployment:** Render (API + DB), Vercel (Client)

---

## API Endpoints
### `GET /reviews`
Returns all saved resume reviews.

### `POST /reviews`
Creates a new resume review.

Example request body:
```json
{
  "name": "Santiago Garcia",
  "email": "santiago@example.com",
  "resume_text": "Resume text here...",
  "job_description": "Job description here...",
  "ai_feedback": "Feedback here...",
  "ai_score": 85
}


### 4) Deployment Links
- `<PUT YOUR RENDER URL HERE>`
- `<VITE_API_BASE_URL=http://localhost:5001>`
- `<https://github.com/Santi841/Full-Stack-Application-Project-6->`




