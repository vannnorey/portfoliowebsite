import { motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export function MagneticButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary",
  className = "" 
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = "relative inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all overflow-hidden group cursor-pointer";
  
  const variantClasses = {
    primary: "backdrop-blur-xl bg-gradient-to-r from-[#6EAEDC]/90 to-[#427396]/90 border border-[#6EAEDC]/30 text-white shadow-lg shadow-[#6EAEDC]/30",
    ghost: "backdrop-blur-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#6EAEDC]/30"
  };

  const content = (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative z-10"
    >
      {/* ISO reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-60 pointer-events-none rounded-xl" />
      
      {/* Neon orbit glow */}
      <motion.div
        className="absolute -inset-8 opacity-0 group-hover:opacity-100"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#6EAEDC] rounded-full blur-sm shadow-[0_0_10px_rgba(110,174,220,0.8)]" />
        </div>
      </motion.div>

      {/* Ripple effect container */}
      <div className="relative flex items-center gap-2 px-6 py-3">
        {children}
      </div>

      {/* Hover highlight sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated border glow */}
        <motion.div 
          className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC] via-[#427396] to-[#6EAEDC] rounded-xl blur-md -z-10 opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated border glow */}
      <motion.div 
        className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC] via-[#427396] to-[#6EAEDC] rounded-xl blur-md -z-10 opacity-0 group-hover:opacity-100"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {content}
    </motion.button>
  );
}