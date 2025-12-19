// GlassButton.tsx
import { motion, useSpring } from "motion/react";
import { ReactNode, useRef, useState } from "react";

type Variant = "primary" | "ghost";
type Shape = "full" | "xl" | "2xl";

interface GlassButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  size?: "sm" | "md" | "lg";
  shape?: Shape; // NEW prop
}

export function GlassButton({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  size = "md",
  shape = "full", // default preserves current behavior
}: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // spring for subtle magnetic effect
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 120) {
      x.set(distX * 0.2);
      y.set(distY * 0.2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // size map (keeps same defaults you had)
  const sizeClasses: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // shape -> tailwind class mapping used everywhere
  const shapeClass: Record<Shape, string> = {
    full: "rounded-full",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const baseClasses =
    `relative inline-flex items-center gap-2 ${sizeClasses[size]} ${shapeClass[shape]} transition-all overflow-hidden group cursor-pointer`;

  const variantClasses: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-[#6EAEDC]/20 to-[#427396]/20 border-2 border-[#6EAEDC]/40 text-white",
    ghost:
      "bg-white/8 border-2 border-white/15 text-white hover:border-[#6EAEDC]/40",
  };

  // Apply shapeClass to all internal overlay elements so they match the parent radius
  const content = (
    <>
      {/* Premium glass layers */}
      <div
        className={`absolute inset-0 ${shapeClass[shape]} pointer-events-none`}
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0.02) 60%, rgba(0, 0, 0, 0.1) 100%)",
        }}
      />

      {/* Secondary glass reflection */}
      <div
        className={`absolute inset-0 ${shapeClass[shape]} pointer-events-none opacity-60`}
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(135deg, rgba(110, 174, 220, 0.2) 0%, transparent 50%, rgba(66, 115, 150, 0.15) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%)",
        }}
      />

      {/* Inner highlight edge */}
      <div
        className={`absolute inset-0 ${shapeClass[shape]} shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.15)] pointer-events-none`}
      />

      {/* Animated outer glow - breathing effect */}
      <motion.div
        className={`absolute -inset-[2px] ${shapeClass[shape]} -z-10`}
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(135deg, rgba(110, 174, 220, 0.6), rgba(66, 115, 150, 0.5), rgba(110, 174, 220, 0.6))"
              : "linear-gradient(135deg, rgba(110, 174, 220, 0.3), rgba(66, 115, 150, 0.2), rgba(110, 174, 220, 0.3))",
          filter: "blur(12px)",
        }}
        animate={{
          opacity: isHovered ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
          scale: isHovered ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow layer */}
      <motion.div
        className={`absolute -inset-[4px] ${shapeClass[shape]} -z-20`}
        style={{
          background:
            variant === "primary"
              ? "radial-gradient(circle, rgba(110, 174, 220, 0.4), rgba(66, 115, 150, 0.3), transparent 70%)"
              : "radial-gradient(circle, rgba(110, 174, 220, 0.25), transparent 70%)",
          filter: "blur(16px)",
        }}
        animate={{
          opacity: isHovered ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Shimmer sweep effect */}
      <motion.div className={`absolute inset-0 ${shapeClass[shape]} pointer-events-none`}>
        <motion.div
          className="absolute w-[200%] h-full -left-full top-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 100%)",
            filter: "blur(2px)",
          }}
          animate={isHovered ? { x: ["0%", "100%"] } : {}}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </motion.div>

      {/* Top edge glow */}
      <motion.div
        className={`absolute top-0 left-4 right-4 h-px ${shapeClass[shape]}`}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
        }}
        animate={{
          opacity: isHovered ? [0.5, 0.9, 0.5] : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const combined = `${baseClasses} ${variant === "primary" ? variantClasses.primary : variantClasses.ghost} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={{ x, y }}
        className={combined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      style={{ x, y }}
      className={combined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.button>
  );
}
