import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth spring for the top progress bar scaleX
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Circle circumference for a circle with r = 16
  const CIRCUMFERENCE = 2 * Math.PI * 16; // ~100.53

  // Map scroll progress (0..1) to strokeDashoffset (CIRCUMFERENCE..0)
  const dashoffsetUnslashed = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  // Make it smooth with a spring
  const dashoffset = useSpring(dashoffsetUnslashed, {
    stiffness: 120,
    damping: 30,
  });

  // scroll-to-top handler
  const scrollToTop = useCallback(() => {
    // smooth scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6EAEDC] via-[#427396] to-[#6EAEDC] origin-left z-[100]"
        style={{ scaleX }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-sm"
          style={{
            background:
              "linear-gradient(90deg, rgba(110,174,220,0.8), rgba(66,115,150,0.8), rgba(110,174,220,0.8))",
          }}
        />
      </motion.div>

      {/* Scroll indicator (clickable) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full backdrop-blur-xl bg-white/5 border border-[#6EAEDC]/20 flex items-center justify-center z-50 focus:outline-none"
      >
        <motion.svg
          className="w-6 h-6 -rotate-90"
          viewBox="0 0 36 36"
          role="img"
          aria-hidden="true"
        >
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="rgba(110,174,220,0.2)"
            strokeWidth="2"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#6EAEDC"
            strokeWidth="2"
            strokeLinecap="round"
            // use the reactive dashoffset spring
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: dashoffset,
            }}
          />
        </motion.svg>
      </button>
    </>
  );
}
