# 🤖 Unathi AI - Multi-Agent System

A sophisticated multi-agent AI system built for the **Bharat Unnati AI Fellowship Capstone 2026**. This project leverages Google's Generative AI (Gemini) to provide intelligent evaluation, feedback, and deployment readiness assessment.

## 🎯 Overview

**Unathi AI** is a real-world problem-solving platform that harnesses multiple AI agents to evaluate code quality, track student success, and assess deployment readiness. Each agent is specialized in a different domain:

- **Agent 03 - Expert Reviewer**: Conducts comprehensive code reviews with detailed rubric-based feedback
- **Agent 04 - Success Manager**: Synthesizes weekly performance data and generates growth analytics
- **Agent 06 - Lead Engineer**: Evaluates deployment readiness across multiple dimensions

## ✨ Key Features

### 🔍 Expert Code Review (Agent 03)
- Evaluates code across 5 dimensions: Logic, Efficiency, Readability, Error Handling, and Patterns
- Provides structured feedback with scores (1-5 scale)
- Identifies specific strengths and areas for improvement
- Offers encouragement and actionable insights

### 📊 Success Analytics (Agent 04)
- Tracks weekly performance metrics
- Visualizes growth trajectory over time
- Generates comprehensive performance summaries
- Analyzes engagement quality and improvement rates

### 🚀 Deployment Readiness Assessment (Agent 06)
- Evaluates readiness across 4 tiers:
  - **Tier 1**: Deployment Ready
  - **Tier 2**: Conditional Deployment
  - **Tier 3**: Pre-Deployment
  - **Tier 4**: Foundational Review
- Analyzes self-resolution rate, peer feedback, and technical collaboration
- Provides personalized deployment recommendations

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS + Motion animations
- **Backend**: Express.js (Node.js)
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Build Tools**: Vite, ESBuild
- **UI Components**: Lucide React, Recharts, React Markdown

## 📦 Dependencies

```json
{
  "@google/genai": "^1.29.0",
  "@google/generative-ai": "^0.24.1",
  "react": "^19.0.1",
  "express": "^4.21.2",
  "tailwindcss": "^4.1.14",
  "motion": "^12.23.24",
  "recharts": "^3.8.1",
  "react-markdown": "^10.1.0"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/crajesha/Multi-Agent.git
   cd Multi-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:3000`

## 📝 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (frontend + backend)
npm run build

# Start production server
npm start

# Clean build artifacts
npm clean

# Type check with TypeScript
npm run lint
```

## 📂 Project Structure

```
Multi-Agent/
├── src/
│   ├── components/
│   │   ├── Agent03.tsx          # Expert Reviewer component
│   │   ├── Agent04.tsx          # Success Manager component
│   │   ├── Agent06.tsx          # Lead Engineer component
│   │   └── GlassCard.tsx        # Reusable glass-morphism card
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # React entry point
│   ├── types.ts                 # TypeScript interfaces
│   └── index.css                # Global styles
├── server.ts                    # Express server & API routes
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript configuration
├── index.html                   # HTML template
└── .env.example                 # Environment variables template
```

## 🔌 API Endpoints

### POST `/api/evaluate-assignment`
Evaluate student code submissions with Expert Reviewer (Agent 03)

**Request:**
```json
{
  "code": "// your code here"
}
```

**Response:**
```json
{
  "scores": [
    {
      "dimension": "Logic",
      "score": 4,
      "feedback": "Good implementation..."
    }
  ],
  "specificFeedback": "...",
  "strengths": ["..."],
  "skillsToStrengthen": ["..."],
  "encouragementMessage": "...",
  "overallGrade": "A"
}
```

### POST `/api/generate-report`
Generate weekly success report (Agent 04)

**Request:**
```json
{
  "studentData": {
    "completedAssignments": 5,
    "qualityScore": 85,
    "engagementLevel": "high"
  }
}
```

**Response:**
```json
{
  "weeklySuccessScore": 88,
  "growthTrajectory": [
    { "day": "Monday", "score": 80 },
    { "day": "Tuesday", "score": 85 }
  ],
  "summary": "...",
  "engagementQuality": "Excellent",
  "improvementRate": "15%"
}
```

### POST `/api/evaluate-readiness`
Assess deployment readiness (Agent 06)

**Request:**
```json
{
  "metrics": {
    "testCoverage": 85,
    "codeQuality": 4.2,
    "peerReviews": 3
  }
}
```

**Response:**
```json
{
  "tier": "Tier 1 – Deployment Ready",
  "selfResolutionRate": 92,
  "peerFeedbackScore": 4.3,
  "technicalCollaboration": "Excellent",
  "communicationQuality": "Professional",
  "culturalContribution": "Positive influence",
  "recommendation": "Ready for deployment"
}
```

## 🎨 UI/UX Features

- **Glass Morphism Design**: Modern frosted glass aesthetic with blur effects
- **Smooth Animations**: Motion animations for seamless transitions
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Dark Theme**: Eye-friendly dark mode optimized for focus
- **Interactive Charts**: Visual data representation using Recharts
- **Markdown Support**: Rich text rendering for detailed feedback

## 🔐 Security & Configuration

- API keys are stored securely in environment variables
- Sensitive data validation on both client and server
- Error handling with graceful fallbacks
- Production build optimization with ESBuild

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

This creates:
- Optimized frontend bundle in `dist/`
- Compiled server in `dist/server.cjs`

### Run Production Server
```bash
npm start
```

The server runs on port 3000 and serves static assets from `dist/`

## 🎓 Use Cases

1. **Educational Institutions**: Automated code review and student assessment
2. **Bootcamps**: Real-time feedback on assignments and progress tracking
3. **Corporate Training**: Technical skill evaluation and deployment readiness
4. **Freelance Platforms**: Quality assurance for submitted projects

## 🔄 AI Integration

The project uses **Google's Gemini 1.5 Flash** model for:
- Natural language processing of code and metrics
- JSON response parsing for structured feedback
- Context-aware evaluation across multiple dimensions
- Real-time processing with error handling

## 📚 Learn More

- [Google Generative AI Docs](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

This is a capstone project for the Bharat Unnati AI Fellowship 2026. Contributions and feedback are welcome!

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 👥 Credits

**Bharat Unnati AI Fellowship • Capstone 2026**

---

**Questions?** Feel free to open an issue or check the documentation in the project.
