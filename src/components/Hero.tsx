import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlassButton } from "./GlassButton";
import { TiltCard } from "./TiltCard";

export function Hero() {
  // Staggered animation orchestration
  const staggerDelay = {
    badge: 0.2,
    title1: 0.26,
    title2: 0.32,
    title3: 0.38,
    description: 0.44,
    buttons: 0.5,
    card: 0.4,
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20"
    >
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content with orchestrated stagger */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: staggerDelay.badge,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="inline-flex items-center gap-2 bg-white/[0.08] border border-[#6EAEDC]/20 rounded-full px-5 py-2.5"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-[#6EAEDC]" />
              </motion.div>
              <span className="text-white/90 text-sm tracking-wide">
                Available for work
              </span>
              <motion.span
                className="w-2 h-2 bg-[#6EAEDC] rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div>
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: staggerDelay.title1,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="inline-block font-black"
                >
                  UX/UI
                </motion.span>
                <br />

                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: staggerDelay.title2,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="font-black bg-gradient-to-r from-[#6EAEDC] via-white to-[#427396]
                            bg-clip-text text-transparent"
                >
                  Designer 
                </motion.span>

                <br />
                
                {/* Developer */}
                {/* <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: staggerDelay.title3,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="inline-block font-black"
                >
                  Graphic Design
                </motion.span> */}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: staggerDelay.description,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="text-[#898989] text-lg sm:text-xl max-w-xl"
            >
              Crafting user experiences and beautiful interface designs through user-centered design principles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: staggerDelay.buttons,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="flex flex-wrap gap-4"
            >
              <GlassButton href="#projects" variant="primary">
                View Projects
                <ArrowRight size={18} />
              </GlassButton>
              <GlassButton href="#contact" variant="ghost">
                Get in Touch
              </GlassButton>
            </motion.div>
          </div>

          {/* Right: 3D Tilt Glass Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: staggerDelay.card,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <TiltCard className="backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#6EAEDC]/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6EAEDC]/15 via-transparent to-[#427396]/10 opacity-60 pointer-events-none" />

              {/* ISO light sweep */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6EAEDC]/60 to-transparent"
                animate={{ x: ["-100%", "200%"], opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }}
              />

              {/* Glowing edge pulse */}
              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC]/40 via-[#427396]/40 to-[#6EAEDC]/40 rounded-3xl blur-md -z-10"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Content */}
              <div className="relative space-y-6">
                <motion.div
                  className="flex items-center gap-4 bg-transparent backdrop-blur-none z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {/* IMAGE + ICON (keeps same size & rounded style) */}
                  <motion.div
                    className="relative w-24 h-24 rounded-2xl overflow-hidden bg-transparent backdrop-blur-none"
                    whileHover={{ rotate: 180, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 90, damping: 12 }}
                  >
                    {/* image inside the rounded tile */}
                    <img
                      src="/image/bg_1.jpg"
                      alt="thumbnail"
                      className="w-full h-full object-cover block"
                      style={{
                        imageRendering: "auto",
                        transform: "translateZ(0)",
                      }}
                    />
                    {/* icon overlay (pointer-events-none so hover still triggers parent) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Sparkles className="w-5 h-5 text-white/40 drop-shadow-md" />
                    </div>
                  </motion.div>

                  {/* TITLE + SUBTITLE */}
                  <div className="space-y-2 backdrop-blur-none">
                    <motion.div
                      className="text-lg font-semibold text-white"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Nop Vannorey
                    </motion.div>

                    <motion.div
                      className="text-[16px]"
                      style={{ color: "#6EAEDC" }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      UI / UX • Designer
                    </motion.div>
                  </div>
                </motion.div>

                {/* Progress rows with labels (keeps same animated bars) */}
                <div className="space-y-3">
                  {[
                    { w: 85, label: "Figma" },
                    { w: 65, label: "XD" },
                    { w: 50, label: "Photoshop" },
                  ].map((p, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-white">
                        <span>{p.label}</span>
                        <span>{p.w}%</span>
                      </div>

                      {/* Glass-style track (outer) */}
                      <div className="h-3 bg-white/6 rounded-full border border-white/10 backdrop-blur-sm overflow-hidden">
                        {/* Animated glassy fill (inner) */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.w}%` }}
                          transition={{
                            delay: 0.8 + i * 0.08,
                            duration: 0.6,
                            ease: [0.33, 1, 0.68, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(0, 149, 255, 0.45), rgba(44, 137, 202, 0.35))",
                            boxShadow:
                              "0 6px 18px rgba(66,115,150,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                            backdropFilter: "blur(4px)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 interactive tiles: icon + small label (retains same hover motion + border style) */}
                <motion.div
                  className="grid grid-cols-3 gap-5 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  {[
                    // I used your uploaded file path for the first preview image
                    { src: "/image/figma.png" },
                    { src: "/image/xd.png" },
                    { src: "/image/photoshop.png" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -6 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 14,
                      }}
                      className="relative aspect-square bg-white/6 cursor-pointer flex items-center justify-center p-3"
                    >
                      {/* soft colored blur behind the plate for depth */}
                      <div
                        className="absolute pointer-events-none inset-0 rounded-lg"
                        style={{
                          // subtle diffuse shadow for depth — uses transparent tint so it works regardless of item.src
                          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                        }}
                      />

                      {/* circular plate for consistent icon display */}
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full p-2 w-18 h-18 backdrop-blur-sm"
                          style={{
                            width: "72px",
                            height: "72px",
                          }}
                        >
                          <img
                            src={item.src}
                            alt="icon"
                            className="w-11 h-11 object-contain"
                          />
                        </div>

                        {/* optional label (remove if you don't want text) */}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
