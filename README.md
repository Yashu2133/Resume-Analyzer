# Resume-Analyzer

An AI-powered web application that analyzes a resume against a job description and provides insights about the match between the candidate's skills and the job requirements.

The project was built to understand how a React frontend can communicate with a Node.js backend and an external AI API.

## Features

* Analyze a resume against a job description
* AI-powered resume analysis
* Identify relevant skills and keywords
* Compare resume content with job requirements
* Generate analysis through an AI model
* React-based frontend
* Node.js + Express backend
* REST API architecture

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* Groq SDK
* REST API
* dotenv
* CORS

### AI

* Groq API
* Large Language Model (LLM)

## How It Works

```text
Resume + Job Description
          ↓
    React Frontend
          ↓
    Express Backend
          ↓
       Groq API
          ↓
      AI Model
          ↓
    Analysis Result
          ↓
    React Frontend
```

## Project Structure

```text
Resume-Analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Yashu2133/Resume-Analyzer.git
cd Resume-Analyzer
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure the API key

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not commit the `.env` file to GitHub.

### 5. Start the backend

Inside the `backend` folder:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

Inside the `frontend` folder:

```bash
npm run dev
```

The frontend runs on the Vite development URL, usually:

```text
http://localhost:5173
```

## API

The frontend sends the resume and job description to the backend.

Example request:

```json
{
  "resume": "Resume content...",
  "jobDescription": "Job description..."
}
```

The backend sends the information to the Groq API and returns the generated analysis to the frontend.

## Environment Variables

The backend requires:

```env
GROQ_API_KEY=your_groq_api_key
```

Keep the API key private and never commit `.env` to GitHub.

## Learning Objectives

This project demonstrates:

* React frontend development
* Express REST APIs
* Client-server communication
* Environment variables
* External API integration
* Working with LLMs
* Prompt engineering
* JSON-based API responses
* Basic error handling

## Future Improvements

* Upload PDF and DOCX resumes
* Calculate a more detailed match percentage
* Extract skills automatically
* Highlight missing keywords
* Provide resume improvement suggestions
* Add multiple AI model options
* Add authentication
* Deploy the application

## Author

RATHIK YASVANT N

GitHub:
https://github.com/Yashu2133
