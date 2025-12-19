import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TiltCard } from "./TiltCard";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  index: number;
}

export function ProjectCard({
  title,
  category,
  description,
  tags,
  image,
  link,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.27, 0.9],
      }}
      className="group relative"
    >
      <TiltCard>
        {/* Premium Glass Card */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          whileHover={{ y: -12 }}
          className="relative bg-white/[0.08] border-2 border-white/20 rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(110, 174, 220, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Premium glass layers */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0.02) 60%, rgba(0, 0, 0, 0.1) 100%)",
            }}
          />

          {/* Secondary glass reflection */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(110, 174, 220, 0.15) 0%, transparent 50%, rgba(66, 115, 150, 0.1) 100%)",
            }}
          />

          {/* Inner highlight edge */}
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.15)] pointer-events-none" />

          {/* Animated outer glow - breathing effect */}
          <motion.div
            className="absolute -inset-[2px] rounded-3xl -z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(110, 174, 220, 0.4), rgba(66, 115, 150, 0.3), rgba(110, 174, 220, 0.4))",
              filter: "blur(12px)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary glow layer */}
          <motion.div
            className="absolute -inset-[4px] rounded-3xl -z-20"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(110, 174, 220, 0.3), rgba(66, 115, 150, 0.2), transparent 70%)",
              filter: "blur(16px)",
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Enhanced glow on hover */}
          <motion.div
            className="absolute -inset-[6px] rounded-3xl -z-30 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle, rgba(110, 174, 220, 0.5), rgba(66, 115, 150, 0.3), transparent 70%)",
              filter: "blur(24px)",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer sweep effect */}
          <motion.div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[200%] h-full -left-full top-0 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 100%)",
                filter: "blur(2px)",
              }}
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </motion.div>

          {/* Top edge glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(110, 174, 220, 0.6), transparent)",
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
                background:
                  "linear-gradient(90deg, transparent, white, transparent)",
                filter: "blur(2px)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Card pop depth shadow */}
          <motion.div
            className="absolute -inset-2 bg-black/30 blur-2xl -z-40 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#427396]/10 to-[#6EAEDC]/10">
            {image ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6EAEDC]/20 to-[#427396]/20 border border-[#6EAEDC]/30"
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            )}

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/95 via-[#0a0e27]/60 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Arrow icon - appears when hovering anywhere on the card */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} in new tab`}
              className="absolute top-4 right-4 z-20"
            >
              <motion.div
                // don't set initial opacity/translate here; CSS handles reveal
                whileHover={{ scale: 1.1 }}
                className="
                  w-12 h-12
                  backdrop-blur-3xl bg-white/10
                  border-1 border-[#6EAEDC]/20
                  rounded-full flex items-center justify-center
                  overflow-hidden
                  opacity-0 translate-y-3
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-400 ease-[cubic-bezier(0.22,1.5,0.36,1)]
                "
              >
                <ArrowUpRight
                  size={26}
                  className="text-[#6EAEDC] relative z-10"
                />
              </motion.div>
            </a>
          </div>

          {/* Content */}
          <div className="relative p-6 space-y-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-[#6EAEDC] text-sm tracking-wide">
                {category}
              </div>
              <h3 className="text-white text-xl">{title}</h3>
              <p className="text-white/50 leading-relaxed">{description}</p>
            </motion.div>

            {/* Tags - enhanced glass pills */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="relative px-3 py-1 backdrop-blur-3xl bg-white/8 border border-[#6EAEDC]/25 rounded-full text-white/70 text-xs hover:text-white hover:border-[#6EAEDC]/50 transition-all cursor-default overflow-hidden group/tag"
                >
                  {/* Tag glass layer */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(110, 174, 220, 0.15), rgba(66, 115, 150, 0.1))",
                    }}
                  />
                  <span className="relative z-10">{tag}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
