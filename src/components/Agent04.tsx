import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, UserCheck, Calendar, Info, RefreshCcw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Agent04Response } from "../types";

export function Agent04() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Agent04Response | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock student data for synthesis
  const mockData = {
    attendance: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    scores: [85, 90, 78, 92, 88],
    questions: ["How to optimize O(n^2)?", "What is RAG?", "Microservices vs SOA"]
  };

  const handleSynthesize = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentData: mockData }),
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
      setError("An unexpected error occurred while generating the report.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // Green
    if (score >= 60) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
          <UserCheck className="text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent 04: The Success Manager</h2>
          <p className="text-slate-400">Temporal Synthesis • Weekly Growth Evaluation</p>
        </div>
      </header>

      {!result && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar className="w-16 h-16 text-purple-500/20 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Weekly Synthesis Required</h3>
          <p className="text-slate-400 mb-6 max-w-md">
            Synthesize the student's week (attendance, scores, and participation) to generate a growth report.
          </p>
          <button
            onClick={handleSynthesize}
            className="px-8 h-12 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Start Temporal Synthesis
          </button>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Info className="w-16 h-16 text-red-500/20 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-red-400">Synthesis Error</h3>
          <p className="text-slate-400 mb-6 max-w-md">
            {error}
          </p>
          <button
            onClick={() => setError(null)}
            className="px-8 h-12 bg-white/10 hover:bg-white/20 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            Go Back
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-full border-4 border-purple-500/30 border-t-purple-500 flex items-center justify-center mb-6"
          />
          <h3 className="text-lg font-semibold text-purple-400">Synthesizing Temporal Data...</h3>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center py-10 relative overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                <Info className="w-3 h-3" />
                Success Score
              </div>
              
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={getScoreColor(result.weeklySuccessScore)}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 88}
                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - result.weeklySuccessScore / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-bold font-mono"
                  >
                    {result.weeklySuccessScore}
                  </motion.span>
                  <span className="text-xs text-slate-400 uppercase font-bold">Percentile</span>
                </div>
              </div>

              <div className="mt-8 space-y-4 w-full">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm">Engagement</span>
                  <span className="text-sm font-bold text-green-400">{result.engagementQuality}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm">Improvement</span>
                  <span className="text-sm font-bold text-blue-400">{result.improvementRate}</span>
                </div>
              </div>
            </GlassCard>

            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="h-[280px]">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  Growth Trajectory
                </h3>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.growthTrajectory || []}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #ffffff10", borderRadius: "12px" }}
                        itemStyle={{ color: "#a855f7" }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard className="flex-1 bg-purple-500/5 border-purple-500/10">
                <h3 className="font-bold mb-4">Success Narrative</h3>
                <p className="text-slate-300 italic leading-relaxed">
                  "{result.summary}"
                </p>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setResult(null)}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest"
                  >
                    Reset Synthesis
                  </button>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
