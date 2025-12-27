import { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react";

const socialLinks: { name: string; url: string }[] = [
  { name: "Telegram", url: "https://t.me/vann_norey" },
  { name: "LinkedIn", url: "" },
  { name: "Dribbble", url: "https://dribbble.com/vann_norey" },
  { name: "Pinterest", url: "https://pin.it/4NA29kxMV" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [heartScale, setHeartScale] = useState(1);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Heart beat animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartScale((prev) => (prev === 1 ? 1.2 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fadeInClasses = (delay = 0) => ({
    className: `transition-all duration-500 ease-out ${
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-5"
    }`,
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  });

  const slideInLeftClasses = (delay = 0) => ({
    className: `transition-all duration-500 ease-out ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
    }`,
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  });

  const scaleInClasses = (delay = 0) => ({
    className: `transition-all duration-500 ease-out ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
    }`,
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  });

  const quickLinks = ["Home", "Projects", "About", "Contact"];

  return (
    <footer
      ref={footerRef}
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#6EAEDC]/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div {...fadeInClasses()} className="space-y-4">
            <div className="text-white tracking-tight text-xl">
              <span className="bg-gradient-to-r from-[#6EAEDC] via-white to-[#427396] bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Crafting beautiful digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div {...fadeInClasses(100)} className="space-y-4">
            <h4 className="text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link, i) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  {...slideInLeftClasses(200 + i * 50)}
                  className="text-white/50 hover:text-[#6EAEDC] transition-all duration-300 text-sm w-fit hover:translate-x-1"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div {...fadeInClasses(200)} className="space-y-4">
            <h4 className="text-white">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.slice(0, 4).map((s, i) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...scaleInClasses(300 + i * 100)}
                  className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-[#6EAEDC]/40 hover:bg-white/10 transition-all duration-300 text-sm hover:-translate-y-0.5 hover:scale-[1.05]"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          {...fadeInClasses(400)}
          className="pt-8 border-t border-[#6EAEDC]/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Portfolio. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <div
                style={{
                  transform: `scale(${heartScale})`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <Heart size={14} className="text-[#6EAEDC] fill-[#6EAEDC]" />
              </div>
              <span>and passion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}