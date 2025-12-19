import { motion } from "motion/react";

export function AmbientMotionLayer() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.05]">
      {/* Slow-moving ambient nebula - no blur */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(110,174,220,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(66,115,150,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(110,174,220,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(66,115,150,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(110,174,220,0.11) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(66,115,150,0.11) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(110,174,220,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(66,115,150,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Drifting orb 1 - no blur */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(110,174,220,0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: ["5%", "45%", "25%", "5%"],
          y: ["15%", "55%", "75%", "15%"],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Drifting orb 2 - no blur */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(66,115,150,0.06) 0%, transparent 70%)",
        }}
        animate={{
          x: ["75%", "35%", "65%", "75%"],
          y: ["65%", "25%", "85%", "65%"],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
      />
    </div>
  );
}