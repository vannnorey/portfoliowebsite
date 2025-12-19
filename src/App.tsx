import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MagneticCursor } from "./components/MagneticCursor";
import { VolumetricLightSweep } from "./components/VolumetricLightSweep";
import { MorphingBlobs } from "./components/MorphingBlobs";
import { ParallaxLayers } from "./components/ParallaxLayers";
import { GPUParticles } from "./components/GPUParticles";
import { AmbientMotionLayer } from "./components/AmbientMotionLayer";
import { ScrollProgress } from "./components/ScrollProgress";
import "./styles/animations.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1d2e] to-[#0a0e27] relative overflow-hidden">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Ambient motion background - 60s loop */}
      <AmbientMotionLayer />
      
      {/* Parallax depth layers */}
      <ParallaxLayers />
      
      {/* Morphing blobs with elastic easing */}
      <MorphingBlobs />
      
      {/* Volumetric light sweeps */}
      <VolumetricLightSweep />
      
      {/* GPU-optimized particles */}
      <GPUParticles />
      
      {/* Magnetic cursor with trails */}
      <MagneticCursor />

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#6EAEDC 1px, transparent 1px), linear-gradient(90deg, #6EAEDC 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}