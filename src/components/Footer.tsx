import { motion } from "motion/react";
import { Heart } from "lucide-react";

const socialLinks: { name: string; url: string }[] = [
  { name: "Telegram", url: "https://t.me/vann_norey" },
  { name: "Dribbble", url: "https://dribbble.com/vann_norey/about?utm_source=Clipboard_%22clipboard_about%22&utm_campaign=%22vann_norey%22&utm_content=%22About%20vann_norey%22&utm_medium=Social_Share" },
  { name: "Pinterest", url: "https://pin.it/60BkWMm6v" },
  { name: "Github", url: "https://github.com/vannnorey" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#6EAEDC]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white tracking-tight text-xl">
              <span className="bg-gradient-to-r from-[#6EAEDC] via-white to-[#427396] bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Crafting beautiful digital experiences with passion and precision.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["Home", "Projects", "About", "Contact"].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ x: 5, color: "#6EAEDC" }}
                  className="text-white/50 hover:text-[#6EAEDC] transition-all text-sm w-fit"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.slice(0, 4).map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-[#6EAEDC]/40 hover:bg-white/10 transition-all text-sm"
                >
                  {s.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-[#6EAEDC]/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Portfolio. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-[#6EAEDC] fill-[#6EAEDC]" />
              </motion.div>
              <span>and passion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
