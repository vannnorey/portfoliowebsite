import { motion } from "motion/react";

export function VolumetricLightSweep() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5 opacity-30">
      {/* Diagonal sweep - no blur */}
      <motion.div
        className="absolute -top-full -left-full w-[300%] h-[300%]"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, rgba(110,174,220,0.15) 48%, rgba(110,174,220,0.25) 50%, rgba(110,174,220,0.15) 52%, transparent 60%)",
        }}
        animate={{
          x: ["-100%", "100%"],
          y: ["-100%", "100%"],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeatDelay: 3,
        }}
      />

      {/* Vertical sweep - minimal blur */}
      <motion.div
        className="absolute top-0 bottom-0 w-[80px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(110,174,220,0.2), transparent)",
          filter: "blur(8px)",
        }}
        animate={{
          left: ["0%", "100%"],
          opacity: [0, 0.5, 0.5, 0],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeatDelay: 5,
          delay: 2,
        }}
      />
    </div>
  );
}