import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY || API_KEY === "MY_GEMINI_API_KEY") {
  console.warn("WARNING: GEMINI_API_KEY is not set or using placeholder value. AI features will fail.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function extractJson(text: string) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    return null;
  }
}

// Agent 03: Expert Reviewer
app.post("/api/evaluate-assignment", async (req, res) => {
  const { code } = req.body;
  
  if (!API_KEY || API_KEY === "MY_GEMINI_API_KEY") {
    return res.status(500).json({ error: "AI Agent is not configured. Please add your GEMINI_API_KEY to the Secrets panel." });
  }

  const prompt = `
    You are a senior software engineer with fifteen years of experience conducting code reviews.
    Evaluate the following student submission and return ONLY a valid JSON object.
    
    Rubric: Logic, Efficiency, Readability, Error Handling, Patterns.
    
    Code:
    ${code}
    
    JSON Structure:
    {
      "scores": [
        { "dimension": "string", "score": number(1-5), "feedback": "string" }
      ],
      "specificFeedback": "markdown string",
      "strengths": ["string"],
      "skillsToStrengthen": ["string"],
      "encouragementMessage": "string",
      "overallGrade": "string"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const data = extractJson(text);
    if (!data) throw new Error("Failed to parse AI response as JSON");
    res.json(data);
  } catch (error: any) {
    console.error("Agent 03 Error:", error);
    res.status(500).json({ error: error.message || "AI Agent 03 failed to respond." });
  }
});

// Agent 04: Success Manager
app.post("/api/generate-report", async (req, res) => {
  const { studentData } = req.body;
  
  if (!API_KEY || API_KEY === "MY_GEMINI_API_KEY") {
    return res.status(500).json({ error: "AI Agent is not configured." });
  }

  const prompt = `
    Synthesize this student week and return ONLY a JSON object.
    Data: ${JSON.stringify(studentData)}
    
    JSON Structure:
    {
      "weeklySuccessScore": number(0-100),
      "growthTrajectory": [{ "day": "string", "score": number }],
      "summary": "string",
      "engagementQuality": "string",
      "improvementRate": "string"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const data = extractJson(text);
    if (!data) throw new Error("Failed to parse AI response");
    res.json(data);
  } catch (error: any) {
    console.error("Agent 04 Error:", error);
    res.status(500).json({ error: "AI Agent 04 failed to respond." });
  }
});

// Agent 06: Lead Engineer
app.post("/api/evaluate-readiness", async (req, res) => {
  const { metrics } = req.body;
  
  if (!API_KEY || API_KEY === "MY_GEMINI_API_KEY") {
    return res.status(500).json({ error: "AI Agent is not configured." });
  }

  const prompt = `
    Analyze deployment readiness and return ONLY a JSON object.
    Metrics: ${JSON.stringify(metrics)}
    
    Tiers: Tier 1 (Ready), Tier 2 (Conditional), Tier 3 (Pre), Tier 4 (Review).
    
    JSON Structure:
    {
      "tier": "Exact tier name",
      "selfResolutionRate": number,
      "peerFeedbackScore": number,
      "technicalCollaboration": "string",
      "communicationQuality": "string",
      "culturalContribution": "string",
      "recommendation": "string"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const data = extractJson(text);
    if (!data) throw new Error("Failed to parse AI response");
    res.json(data);
  } catch (error: any) {
    console.error("Agent 06 Error:", error);
    res.status(500).json({ error: "AI Agent 06 failed to respond." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
