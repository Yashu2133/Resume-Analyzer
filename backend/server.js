const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume & JD Analyzer API is running",
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: "Resume and job description are required.",
      });
    }

    const prompt = `
You are an AI career document analyzer.

Analyze the resume against the job description.

Rules:
- Do not invent skills, experience, education, or qualifications.
- Use only the information provided.
- The match percentage is an approximate skill/text alignment indicator.
- Do not make a hiring decision.
- Keep suggestions practical.
- Return only valid JSON.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Return exactly this JSON structure:

{
  "match_percentage": 0,
  "matching_skills": [],
  "missing_skills": [],
  "relevant_keywords": [],
  "suggestions": [],
  "summary": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    res.json(result);
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      error: "Failed to analyze the resume.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});