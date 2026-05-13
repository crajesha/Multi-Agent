import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Code2, UserCheck, ShieldCheck, Github, ExternalLink } from "lucide-react";
import { Agent03 } from "./components/Agent03";
import { Agent04 } from "./components/Agent04";
import { Agent06 } from "./components/Agent06";
import { cn } from "./lib/utils";

type AgentType = "reviewer" | "success" | "lead";

export default function App() {
  const [activeAgent, setActiveAgent] = useState<AgentType>("reviewer");

  const navItems = [
    { id: "reviewer", label: "Expert Reviewer", icon: Code2, agent: "Agent 03" },
    { id: "success", label: "Success Manager", icon: UserCheck, agent: "Agent 04" },
    { id: "lead", label: "Lead Engineer", icon: ShieldCheck, agent: "Agent 06" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass fixed top-0 w-full z-50 px-6 h-16 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            U
          </div>
          <h1 className="font-bold tracking-tighter text-lg hidden sm:block">
            UNATHI <span className="text-blue-400">AI</span>
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 p-1 rounded-xl bg-white/5 border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveAgent(item.id as AgentType)}
              className={cn(
                "px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm font-medium",
                activeAgent === item.id 
                  ? "bg-white/10 text-white shadow-inner" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeAgent === item.id ? "text-blue-400" : "text-slate-500")} />
              <span className="hidden md:block">{item.label}</span>
              <span className="text-[10px] font-bold opacity-50 hidden lg:block">{item.agent}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAgent}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {activeAgent === "reviewer" && <Agent03 />}
            {activeAgent === "success" && <Agent04 />}
            {activeAgent === "lead" && <Agent06 />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5 text-center">
        <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
          Bharat Unnati AI Fellowship • Capstone 2026
        </p>
      </footer>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
