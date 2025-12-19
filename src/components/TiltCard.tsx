import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ReactNode, useRef, useState, useEffect } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * TiltCard - less jittery tilt:
 * - MAX_INPUT small so tilt is subtle
 * - spring stiffness/damping increased for smoother settling
 * - tiny mouse changes ignored via EPSILON threshold
 * - tilt disabled on touch devices
 */
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // motion values (raw)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // small max input to reduce extreme tilts
  const MAX_INPUT = 0.25; // reduce to 0.15 for even subtler effect
  const EPSILON = 0.02; // ignore tiny moves to avoid jitter

  // last values to implement thresholding
  const lastX = useRef(0);
  const lastY = useRef(0);

  // detect touch device and disable tilt if true
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const touchDetected =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touchDetected));
  }, []);

  // map raw normalized mouse to small rotate angles
  // smaller angles -> less noticeable jitter
  const mappedRotateX = useTransform(mouseY, (v) => {
    const clamped = Math.max(-MAX_INPUT, Math.min(MAX_INPUT, v));
    return (clamped / MAX_INPUT) * -4; // rotateX range [-4..4]
  });
  const mappedRotateY = useTransform(mouseX, (v) => {
    const clamped = Math.max(-MAX_INPUT, Math.min(MAX_INPUT, v));
    return (clamped / MAX_INPUT) * 4; // rotateY range [-4..4]
  });

  // stronger springs for smoother settling (less oscillation)
  const rotateX = useSpring(mappedRotateX, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(mappedRotateY, { stiffness: 220, damping: 28 });

  // shadow values
  const shadowX = useTransform(rotateY, [-4, 4], [-10, 10]);
  const shadowY = useTransform(rotateX, [-4, 4], [-10, 10]);
  const shadowBlur = useTransform([shadowX, shadowY], ([x, y]) =>
    Math.abs((x as number) + (y as number)) * 0.6 + 14
  );
  const shadowFilter = useTransform(shadowBlur, (b) => `blur(${b}px)`);

  const ambient = useTransform([mouseX, mouseY], ([x, y]) => {
    const px = 50 + (x as number) * 50;
    const py = 50 + (y as number) * 50;
    return `radial-gradient(circle at ${px}% ${py}%, transparent 40%, rgba(0,0,0,0.08) 100%)`;
  });

  // handle pointer/mouse movement with threshold
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || isTouch) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);

    // clamp
    const clampedX = Math.max(-MAX_INPUT, Math.min(MAX_INPUT, relativeX));
    const clampedY = Math.max(-MAX_INPUT, Math.min(MAX_INPUT, relativeY));

    // threshold check to avoid tiny updates causing jitter
    if (Math.abs(clampedX - lastX.current) < EPSILON && Math.abs(clampedY - lastY.current) < EPSILON) {
      return;
    }

    lastX.current = clampedX;
    lastY.current = clampedY;

    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  const handlePointerLeave = () => {
    // reset to center
    lastX.current = 0;
    lastY.current = 0;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      // rotate motion values applied here
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // gentle scale on hover only (no rotation override)
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.08 }}
    >
      {/* shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        style={{
          x: shadowX,
          y: shadowY,
          filter: shadowFilter,
          background: "rgba(66,115,150,0.28)",
          opacity: 0.6,
        }}
      />

      {/* ambient occlusion */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: ambient,
        }}
      />

      {children}
    </motion.div>
  );
}
