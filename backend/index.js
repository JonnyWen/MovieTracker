import express from "express";
import cors from "cors"; // allows from cross origin calls

// create server instance, obj rep entire backend API
// express is node framework that allow for define
// how to handle http protocols 
// express app <- our own traffic controller

const app = express();
// use cors, allow other websites (frontend)
// to call backend
app.use(cors());
// auto parese incoming JSON request bodies
app.use(express.json());

app.post("/api/recommend", async (req, res) => {
    try {
        const { likedMovies } = req.body;

        if (!likedMovies || likedMovies.length === 0) {
            return res.status(400).json({ error: "No liked movies provided" });
        }

        const prompt = `
            # Identity
            You are a movie recommendation engine.

            # Instructions
            Based on these liked movies: ${likedMovies.join(", ")}
            Recommend 5 movies
            Only recommend movies with IMDB rating is greater than 6/10
            For each movie, give:
            - title
            - short reason

            Return JSON only in this format: 
            [
                { "title": "...", "reason": "..." }
            ]
            Return ONLY valid JSON.
            Do not include explanations.
            Do not include markdown.
            Do not include text outside JSON.
            The response must start with '[' and end with ']'.
        `
        const ollamaRes = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",
                prompt,
                stream: false,
            }),
        });

        const data = await ollamaRes.json();

        res.json({
            recommendations: JSON.parse(data.response),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "LLaMA request failed" });
    }
});

app.listen(3001, () => {
    console.log("✅ Backend running on http://localhost:3001");
});
