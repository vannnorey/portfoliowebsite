import { motion, useSpring } from "motion/react";
import { useEffect, useState, useRef } from "react";

// Star shape component
function Star({
  size = 8,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: string }>>([]);
  const trailIdCounter = useRef(0);

  // Spring physics for smooth cursor movement
  const cursorX = useSpring(0, { stiffness: 90, damping: 12 });
  const cursorY = useSpring(0, { stiffness: 90, damping: 12 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Add trail particle with unique ID using counter only
      trailIdCounter.current += 1;
      const uniqueId = `trail-${trailIdCounter.current}`;
      
      setTrails((prev) => [
        ...prev.slice(-12),
        { x: e.clientX, y: e.clientY, id: uniqueId },
      ]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Star particle trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50 mix-blend-screen"
          style={{
            left: trail.x,
            top: trail.y,
          }}
          initial={{ opacity: 0.7, scale: 1, rotate: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            rotate: 360
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <Star 
              size={8} 
              className="text-[#6EAEDC]"
              style={{
                filter: "drop-shadow(0 0 4px rgba(110, 174, 220, 0.8))",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Main cursor star with glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Outer glow layer */}
          <motion.div
            className="absolute inset-0 -inset-12"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-40 h-40 blur-[40px]"
              style={{
                background: "radial-gradient(circle, rgba(110,174,220,0.4) 0%, rgba(66,115,150,0.2) 50%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Rotating star with pulse */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Star 
              size={20} 
              className="text-[#6EAEDC]"
              style={{
                filter: "drop-shadow(0 0 8px rgba(110, 174, 220, 1)) drop-shadow(0 0 16px rgba(110, 174, 220, 0.6))",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Secondary star glow layer */}
      <motion.div
        className="fixed pointer-events-none z-40 mix-blend-screen"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.15, 1],
            }}
            transition={{
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Star 
              size={32} 
              className="text-[#427396] opacity-40"
              style={{
                filter: "blur(8px)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}