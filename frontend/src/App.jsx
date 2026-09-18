import { useState } from "react";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please enter both your resume and job description.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Unable to analyze the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>AI Resume & JD Analyzer</h1>
        <p>
          Compare your resume with a job description using AI.
        </p>
      </header>

      <main>
        <section className="input-grid">

          <div className="input-card">
            <h2>Your Resume</h2>

            <textarea
              placeholder="Paste your resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="input-card">
            <h2>Job Description</h2>

            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

        </section>

        <button
          className="analyze-button"
          onClick={analyzeResume}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <section className="result-card">

            <h2>AI Analysis Result</h2>

            <div className="score">
              <span>{result.match_percentage}%</span>
              <small>Match</small>
            </div>

            <div className="result-section">
              <h3>Matching Skills</h3>

              <ul>
                {result.matching_skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Missing Skills</h3>

              <ul>
                {result.missing_skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Relevant Keywords</h3>

              <ul>
                {result.relevant_keywords?.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Suggestions</h3>

              <ul>
                {result.suggestions?.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Summary</h3>
              <p>{result.summary}</p>
            </div>

          </section>
        )}
      </main>
    </div>
  );
}

export default App;