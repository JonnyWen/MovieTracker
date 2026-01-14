# 🎬 AI-Powered Movie Recommendation Platform

A full-stack movie discovery and recommendation platform that combines a modern React frontend, a Node.js backend, real-world movie data from TMDB, and an open-source LLaMA language model to deliver personalized recommendations.

## ✨ Features

- Browse popular and trending movies with rich metadata

- Like movies to build a personal preference profile

- Generate AI-powered movie recommendations based on liked movies

- Resolve AI-generated recommendations to real TMDB movies (no hallucinated data)

- Clickable movie cards with detailed movie pages

## 🧠 How Recommendations Work

- User likes movies on the frontend

- Liked movie titles are sent to the backend

- A locally hosted LLaMA model (via Ollama) infers user taste and suggests movie titles

- The backend resolves each recommendation against the TMDB API

- Only valid, real movies are returned to the frontend and rendered as movie cards

- AI is used for taste inference, not as a source of truth.

## 🏗️ Tech Stack
### Frontend

- React + TypeScript

- React Router

- Tailwind CSS

- Context API (global state)

- TMDB REST API

### Backend

- Node.js + Express

- Open-source LLaMA model via Ollama

- TMDB REST API

- Defensive parsing and validation for AI outputs

## 🚀 Getting Started
### Prerequisites

- Node.js (v18+ recommended)

- npm

- Ollama installed and running

- TMDB API key

#### 1️⃣ Clone the repository
git clone https://github.com/your-username/movie-site.git
cd movie-site

#### 2️⃣ Set up environment variables

Create a .env file in backend/:

TMDB_API_KEY=your_tmdb_api_key_here

#### 3️⃣ Install dependencies
npm install
npm install --prefix frontend
npm install --prefix backend

#### 4️⃣ Start Ollama (LLaMA)
ollama serve

##### Ensure the model is available:

ollama pull llama3

#### 5️⃣ Run the app (frontend + backend)
npm run dev

Frontend: http://localhost:5173

Backend: http://localhost:3001

## 🛡️ Reliability & Design Choices

- AI output is treated as untrusted input

- Backend validates and resolves recommendations against TMDB

- No hardcoded AI or database IDs

- Stateless backend API

- Vendor-agnostic AI design (can swap models easily)

## 📸 Screenshots

<img width="2932" height="1642" alt="image" src="https://github.com/user-attachments/assets/d06872bc-88d8-4ea9-b0c5-52ee7fdefbfb" />
<img width="2708" height="1632" alt="image" src="https://github.com/user-attachments/assets/61c097a6-8279-416f-9e0b-486d003e08e7" />
<img width="2686" height="1620" alt="image" src="https://github.com/user-attachments/assets/587ee235-b41f-4697-8c40-2868ff486a3b" />


## 📌 Future Improvements

- Recommendation explanations shown directly on movie cards

- Caching recommendations for repeated liked lists

- User authentication and profiles

- Advanced filtering and genre-based recommendations

- Deployment (Docker / Railway / Fly.io)

- Persistent liked movies using local storage
