import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { motion, AnimatePresence } from "motion/react";
import { Send, Code2, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Agent03Response } from "../types";

export function Agent03() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Agent03Response | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/evaluate-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while contacting the AI Agents.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
          <Code2 className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent 03: Expert Reviewer</h2>
          <p className="text-slate-400">Senior Software Engineer Persona • Code Quality Analysis</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="flex flex-col h-[600px]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-blue-400" />
            Paste Your Submission
          </h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-black/20 border border-white/5 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
            placeholder="// Paste your code here..."
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !code.trim()}
            className="mt-4 w-full h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit for Review
              </>
            )}
          </button>
        </GlassCard>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <AlertCircle className="w-12 h-12 text-red-500 opacity-50" />
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Ensure your GEMINI_API_KEY is configured in the Secrets panel.
              </p>
            </motion.div>
          )}

          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <GlassCard className="border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="text-yellow-400 w-5 h-5" />
                    Overall Grade: <span className="text-blue-400">{result.overallGrade}</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {result.scores?.map((score, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                          {score.dimension}
                        </span>
                        <span className="text-blue-400 font-mono">{score.score}/5</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(score.score / 5) * 100}%` }}
                          className="bg-blue-500 h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="flex-1 h-[300px] overflow-y-auto">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  Technical Analysis
                </h4>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{result.specificFeedback}</ReactMarkdown>
                </div>
              </GlassCard>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h5 className="text-xs font-bold text-green-400 uppercase mb-2">Strengths</h5>
                  <ul className="text-sm space-y-1">
                    {result.strengths?.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 mt-1 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <h5 className="text-xs font-bold text-orange-400 uppercase mb-2">Skills to Strengthen</h5>
                  <ul className="text-sm space-y-1">
                    {result.skillsToStrengthen?.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-400 mt-2 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-sm italic text-slate-400 text-center px-4">
                "{result.encouragementMessage}"
              </p>
            </motion.div>
          ) : (
            <GlassCard className="flex flex-col items-center justify-center text-slate-500 h-full">
              <Code2 className="w-16 h-16 mb-4 opacity-20" />
              <p>Results will appear here after submission</p>
            </GlassCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
