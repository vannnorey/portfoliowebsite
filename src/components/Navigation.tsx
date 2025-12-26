import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto">
        <div
          className={`relative backdrop-blur-3xl border border-white/20 rounded-full px-4 md:px-6 py-3 overflow-hidden ${
            scrolled
              ? "bg-[rgba(255,255,255,0.1)]"
              : "bg-[rgba(255,255,255,0.08)]"
          }`}
          style={{
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(110, 174, 220, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Premium glass layers */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0.02) 60%, rgba(0, 0, 0, 0.1) 100%)",
            }}
          />

          {/* Secondary glass reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(110, 174, 220, 0.15) 0%, transparent 50%, rgba(66, 115, 150, 0.1) 100%)",
            }}
          />

          {/* Inner highlight edge */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.15)] pointer-events-none" />

          {/* Static outer glow - NO ANIMATION */}
          <div
            className="absolute -inset-[1px] rounded-full -z-10 opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(110, 174, 220, 0.4), rgba(66, 115, 150, 0.3), rgba(110, 174, 220, 0.4))",
              filter: "blur(12px)",
            }}
          />

          {/* Static secondary glow layer - NO ANIMATION */}
          <div
            className="absolute -inset-[2px] rounded-full -z-20 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(110, 174, 220, 0.3), rgba(66, 115, 150, 0.2), transparent 70%)",
              filter: "blur(16px)",
            }}
          />

          {/* Static shimmer - NO ANIMATION */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div
              className="absolute w-[200%] h-full -left-full top-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 100%)",
                filter: "blur(1px)",
              }}
            />
          </div>

          {/* Static edge glow - NO ANIMATION */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-full overflow-hidden opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(110, 174, 220, 0.6), transparent)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, white, transparent)",
                filter: "blur(2px)",
              }}
            />
          </div>

          {/* Bottom edge static glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-40"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(66, 115, 150, 0.5), transparent)",
            }}
          />

          {/* Corner highlights */}
          <div
            className="absolute top-0 left-8 w-16 h-px opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
            }}
          />

          <div
            className="absolute top-0 right-8 w-16 h-px opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
            }}
          />

          <div className="relative flex items-center justify-between gap-4">
            {/* Logo - static */}
            <div className="relative cursor-pointer">
              <span className="bg-gradient-to-r from-[#6EAEDC] via-white to-[#6EAEDC] bg-clip-text text-transparent text-white">
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8">
              {/* Static separator */}
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/30 to-transparent" />

              {/* Nav links - static */}
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="relative text-sm text-white hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-10 p-2 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer - static */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#2A2C38]/80 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] z-50 overflow-hidden">
            {/* Glass panel */}
            <div
              className="absolute inset-0 backdrop-blur-3xl border-l border-white/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(42, 44, 56, 0.95), rgba(38, 37, 36, 0.95))",
                boxShadow:
                  "-8px 0 32px rgba(0, 0, 0, 0.3), inset 1px 0 0 rgba(255, 255, 255, 0.1)",
              }}
            />

            {/* Glass layers */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(0, 0, 0, 0.05) 100%)",
              }}
            />

            {/* Static glow edge */}
            <div
              className="absolute top-0 left-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(110, 174, 220, 0.6), transparent)",
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col p-8 pt-24">
              {/* Menu items */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="relative"
                  >
                    <div className="relative backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden">
                      {/* Glass background */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
                        }}
                      />

                      {/* Text */}
                      <span className="relative z-10 text-white">
                        {item.label}
                      </span>

                      {/* Static accent border */}
                      <div
                        className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-[#6EAEDC] via-white to-[#427396]"
                      />
                    </div>
                  </a>
                ))}
              </nav>

              {/* Decorative element */}
              <div className="mt-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                <p className="text-white text-sm text-center">
                  Premium Portfolio 2025
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}