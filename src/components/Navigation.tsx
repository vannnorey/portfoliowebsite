import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Spring physics for smooth scroll response
  const navY = useSpring(-100, { stiffness: 110, damping: 20 });

  useEffect(() => {
    navY.set(0);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navY]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      style={{ y: navY }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{
          backgroundColor: { duration: 0.3 },
        }}
        className="relative backdrop-blur-3xl border border-white/20 rounded-full px-6 py-3 overflow-hidden"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(110, 174, 220, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Premium glass layers */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0.02) 60%, rgba(0, 0, 0, 0.1) 100%)",
          }}
        />

        {/* Secondary glass reflection */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-60"
          style={{
            background: "linear-gradient(135deg, rgba(110, 174, 220, 0.15) 0%, transparent 50%, rgba(66, 115, 150, 0.1) 100%)",
          }}
        />
        
        {/* Inner highlight edge */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.15)] pointer-events-none" />
        
        {/* Animated outer glow - breathing effect */}
        <motion.div 
          className="absolute -inset-[1px] rounded-full -z-10"
          style={{
            background: "linear-gradient(135deg, rgba(110, 174, 220, 0.4), rgba(66, 115, 150, 0.3), rgba(110, 174, 220, 0.4))",
            filter: "blur(12px)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glow layer */}
        <motion.div 
          className="absolute -inset-[2px] rounded-full -z-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(110, 174, 220, 0.3), rgba(66, 115, 150, 0.2), transparent 70%)",
            filter: "blur(16px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Shimmer sweep effect */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        >
          <motion.div
            className="absolute w-[200%] h-full -left-full top-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>

        {/* Animated edge glow particles */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(110, 174, 220, 0.6), transparent)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, white, transparent)",
              filter: "blur(2px)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Bottom edge subtle glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(66, 115, 150, 0.5), transparent)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Corner highlights */}
        <motion.div
          className="absolute top-0 left-8 w-16 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />

        <motion.div
          className="absolute top-0 right-8 w-16 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.3,
          }}
        />
        
        <div className="relative flex items-center gap-8">
          {/* Enhanced logo with animation */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative cursor-pointer group/logo"
          >
            <motion.span 
              className="bg-gradient-to-r from-[#6EAEDC] via-white to-[#6EAEDC] bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% auto",
              }}
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Portfolio
            </motion.span>

            {/* Logo hover glow */}
            <motion.div
              className="absolute inset-0 -inset-x-2 -inset-y-1 rounded-full blur-md opacity-0 group-hover/logo:opacity-100 -z-10"
              style={{
                background: "radial-gradient(circle, rgba(110, 174, 220, 0.4), transparent 70%)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Animated separator */}
          <motion.div 
            className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced nav links */}
          <div className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative text-sm group/link"
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    color: hoveredIndex === index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.75)",
                    y: hoveredIndex === index ? -1 : 0,
                  }}
                  transition={{ 
                    color: { duration: 0.2 },
                    y: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Glass hover background with gradient */}
                <motion.div
                  className="absolute inset-0 -inset-x-3 -inset-y-1.5 rounded-full -z-10 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Hover shimmer effect */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      }}
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Hover glow behind */}
                <motion.div
                  className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-full -z-20"
                  style={{
                    background: "radial-gradient(circle, rgba(110, 174, 220, 0.4), transparent 70%)",
                    filter: "blur(8px)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated underline with particles */}
                <div className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden">
                  {/* Main underline */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#6EAEDC] via-white to-[#6EAEDC] rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: hoveredIndex === index ? 1 : 0,
                      opacity: hoveredIndex === index ? 0.8 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Traveling light particle on underline */}
                  {hoveredIndex === index && (
                    <>
                      <motion.div
                        className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ x: "-20%" }}
                        animate={{ x: "120%" }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          filter: "blur(1px)",
                        }}
                      />
                      <motion.div
                        className="absolute inset-y-0 w-2 rounded-full"
                        style={{
                          background: "radial-gradient(circle, white, transparent)",
                        }}
                        initial={{ x: "-10%" }}
                        animate={{ x: "110%" }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Underline glow */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(110,174,220,0.6), rgba(255,255,255,0.8), rgba(66,115,150,0.6))",
                    boxShadow: "0 0 8px rgba(110,174,220,0.6), 0 0 16px rgba(110,174,220,0.3)",
                    filter: "blur(1px)",
                    transformOrigin: "left",
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scaleX: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}