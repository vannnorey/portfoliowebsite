import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function GPUParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1.5,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.15,
      rotation: Math.random() * 360,
    }))
  );

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (reducedMotion) {
    return null; // No particles in reduced motion mode
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * 3,
            height: particle.size * 3,
          }}
          animate={{
            y: [0, -120, -240, -120, 0],
            x: [0, 15, -15, 10, 0],
            rotate: [particle.rotation, particle.rotation + 180, particle.rotation + 360],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 1.4,
              particle.opacity * 0.6,
              particle.opacity * 1.2,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: particle.delay,
          }}
        >
          {/* Star shape particle - no blur */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full"
            style={{ 
              filter: 'drop-shadow(0 0 2px rgba(110, 174, 220, 0.6))' 
            }}
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#6EAEDC"
              fillOpacity={particle.opacity}
            />
            {/* Outer glow */}
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="none"
              stroke="#6EAEDC"
              strokeWidth="0.5"
              strokeOpacity={particle.opacity * 0.8}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}