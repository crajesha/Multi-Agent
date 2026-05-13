import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("glass rounded-2xl p-6 overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}
