import React, { useState } from "react";
import { GlassCard } from "./GlassCard";
import { motion } from "motion/react";
import { ShieldCheck, Target, MessageSquare, Heart, Terminal, ArrowRight, UserPlus } from "lucide-react";
import { DeploymentTier, Agent06Response } from "../types";
import { cn } from "../lib/utils";

export function Agent06() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Agent06Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selfRes, setSelfRes] = useState(85);
  const [peerFeed, setPeerFeed] = useState(90);

  const handleEvaluate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/evaluate-readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: { selfResolutionRate: selfRes, peerFeedback: peerFeed } }),
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
      setError("An unexpected error occurred while evaluating readiness.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    if (tier.includes("Ready")) return "bg-green-500 text-black";
    if (tier.includes("Conditional")) return "bg-yellow-500 text-black";
    if (tier.includes("Pre")) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <ShieldCheck className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent 06: The Lead Engineer</h2>
          <p className="text-slate-400">Gatekeeper Persona • Deployment Readiness Engine</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Gate Project Performance
          </h3>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                <span className="text-slate-400">Self-Resolution Rate</span>
                <span className="text-emerald-400">{selfRes}%</span>
              </div>
              <input 
                type="range" 
                value={selfRes} 
                onChange={(e) => setSelfRes(Number(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-slate-500 italic">Frequency of independent problem solving vs mentor aid.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                <span className="text-slate-400">Average Peer Feedback</span>
                <span className="text-emerald-400">{peerFeed}/100</span>
              </div>
              <input 
                type="range" 
                value={peerFeed} 
                onChange={(e) => setPeerFeed(Number(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-slate-500 italic">Technical collaboration and team culture metrics.</p>
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isLoading}
              className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Analyzing Metrics..." : "Run Readiness Evaluation"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </GlassCard>

        <div>
          {error && (
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-12 border-red-500/20">
              <ShieldCheck className="w-12 h-12 text-red-500/20 mb-4" />
              <p className="text-red-400 font-medium mb-4">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest"
              >
                Clear Error
              </button>
            </GlassCard>
          )}

          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className={cn("p-6 rounded-2xl font-bold text-center text-xl shadow-2xl uppercase tracking-tighter", getTierColor(result.tier))}>
                {result.tier}
              </div>

              <GlassCard>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Engineering Recommendation
                </h4>
                <p className="text-lg font-medium text-emerald-100 leading-relaxed mb-6">
                  {result.recommendation}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <UserPlus className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Collaboration</p>
                      <p className="text-sm">{result.technicalCollaboration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <MessageSquare className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Communication</p>
                      <p className="text-sm">{result.communicationQuality}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Heart className="w-5 h-5 text-pink-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Cultural Impact</p>
                      <p className="text-sm">{result.culturalContribution}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-12 border-dashed">
              <ShieldCheck className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-500 font-medium italic">Pending Lead Engineer Analysis...</p>
            </GlassCard>
          )
          }
        </div>
      </div>
    </div>
  );
}
