import { motion } from "motion/react";

export function MorphingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main morphing blob - no blur */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.25, 0.98, 1.18, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: [0.68, -0.55, 0.265, 1.55],
        }}
      >
        <motion.div
          className="w-[700px] h-[700px] rounded-[40%_60%_70%_30%/60%_30%_70%_40%]"
          style={{
            background:
              "radial-gradient(circle, rgba(110,174,220,0.08) 0%, rgba(66,115,150,0.05) 50%, transparent 70%)",
          }}
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 60% 30% 70% 40%",
              "60% 40% 30% 70% / 40% 70% 30% 60%",
              "70% 30% 50% 50% / 50% 60% 40% 60%",
              "50% 50% 60% 40% / 30% 70% 60% 40%",
              "40% 60% 70% 30% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.68, -0.55, 0.265, 1.55],
          }}
        />
      </motion.div>

      {/* Secondary blob - no blur */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          y: [0, 70, -50, 0],
          x: [0, -50, 60, 0],
          scale: [1, 1.15, 0.92, 1],
          rotate: [0, -60, 60, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: [0.68, -0.55, 0.265, 1.55],
          delay: 0.4,
        }}
      >
        <motion.div
          className="w-[450px] h-[450px] rounded-[60%_40%_30%_70%/50%_60%_40%_50%]"
          style={{
            background:
              "radial-gradient(circle, rgba(66,115,150,0.06) 0%, transparent 70%)",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 50% 60% 40% 50%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 50%",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.68, -0.55, 0.265, 1.55],
          }}
        />
      </motion.div>

      {/* Tertiary blob - no blur */}
      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{
          y: [0, -60, 50, 0],
          x: [0, 60, -50, 0],
          scale: [1, 0.88, 1.22, 1],
          rotate: [0, 120, -120, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: [0.68, -0.55, 0.265, 1.55],
          delay: 0.8,
        }}
      >
        <motion.div
          className="w-[500px] h-[500px] rounded-[30%_70%_70%_30%/40%_50%_60%_50%]"
          style={{
            background:
              "radial-gradient(circle, rgba(110,174,220,0.06) 0%, transparent 70%)",
          }}
          animate={{
            borderRadius: [
              "30% 70% 70% 30% / 40% 50% 60% 50%",
              "70% 30% 30% 70% / 60% 40% 50% 50%",
              "30% 70% 70% 30% / 40% 50% 60% 50%",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.68, -0.55, 0.265, 1.55],
          }}
        />
      </motion.div>
    </div>
  );
}