const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

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

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    });

    const result = JSON.parse(
      completion.choices[0].message.content
    );

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