import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxLayers() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Simple static background circles - NO animations */}
      <div
        className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(66,115,150,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(110,174,220,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(110,174,220,0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}