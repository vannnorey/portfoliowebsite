import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxLayers() {
  const { scrollY } = useScroll();

  // Three depth layers with different speeds
  const yFar = useTransform(scrollY, [0, 1000], [0, 150]);
  const yMid = useTransform(scrollY, [0, 1000], [0, 300]);
  const yNear = useTransform(scrollY, [0, 1000], [0, 500]);

  const scaleFar = useTransform(scrollY, [0, 1000], [1, 1.05]);
  const scaleMid = useTransform(scrollY, [0, 1000], [1, 1.08]);
  const scaleNear = useTransform(scrollY, [0, 1000], [1, 1.12]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ perspective: "600px" }}>
      {/* Far layer - no blur */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: yFar,
          scale: scaleFar,
        }}
      >
        <div
          className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(66,115,150,0.3) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Mid layer - no blur */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: yMid,
          scale: scaleMid,
        }}
      >
        <div
          className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(110,174,220,0.25) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Near layer - no blur */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: yNear,
          scale: scaleNear,
        }}
      >
        <div
          className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(110,174,220,0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}