// Contact.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { GlassButton } from "./GlassButton";
import { GlassInput } from "./GlassInput";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  // include validate-error for validation messages
  const [status, setStatus] = useState<
    null | "success" | "error" | "validate-error"
  >(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-hide inline messages (success/error/validation) after 10s
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => {
      setStatus(null);
      setErrorMsg(null);
    }, 5000); // 
    return () => clearTimeout(timer);
  }, [status]);

  async function sendToApi(data: FormData) {
    try {
      const res = await fetch("https://portfoliowebsite-xaix.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const text = await res.text();
      try {
        const json = text ? JSON.parse(text) : null;
        return { ok: res.ok, status: res.status, ...(json ?? {}) };
      } catch {
        return {
          ok: res.ok,
          status: res.status,
          error: text || `HTTP ${res.status}`,
        };
      }
    } catch (err: any) {
      return { ok: false, error: err?.message ?? "Network error" };
    }
  }

  const validate = (data: FormData) => {
    if (!data.name.trim() || !data.email.trim() || !data.message.trim())
      return "Please fill out all fields.";
    if (!/^\S+@\S+\.\S+$/.test(data.email))
      return "Please enter a valid email.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // remove browser native validation UI
    // (form has noValidate attribute below)
    setStatus(null);
    setErrorMsg(null);

    const v = validate(formData);
    if (v) {
      // validation error (orange)
      setErrorMsg(v);
      setStatus("validate-error");
      return;
    }

    setLoading(true);
    try {
      const result = await sendToApi(formData);
      if (result.ok) {
        setStatus("success");
        setErrorMsg(null);
        setFormData({ name: "", email: "", message: "" });
      } else {
        // server / API error (red)
        const msg = result.error ?? `HTTP ${result.status ?? "?"}`;
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch (err: any) {
      const msg = err?.message ?? "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "vannnorey088@gmail.com",
      href: "mailto:vannnorey088@gmail.com",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "(+855) 163 566 24",
      href: "tel:+85516356624",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value:
        "S/K Samrong Krorm, Pusenchey, Tumnob Kobsrov Street, Phnom Penh, 12001",
      href: undefined,
    },
  ];

  const socialLinks = [
    { name: "Telegram", url: "https://t.me/vann_norey", icon: "T" },
    { name: "Dribbble", url: "https://dribbble.com/vann_norey/about?utm_source=Clipboard_%22clipboard_about%22&utm_campaign=%22vann_norey%22&utm_content=%22About%20vann_norey%22&utm_medium=Social_Share", icon: "D" },
    { name: "Pinterest", url: "https://pin.it/60BkWMm6v", icon: "P" },
    { name: "Github", url: "https://github.com/vannnorey", icon: "G" },
  ];

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* small top line */}
      <motion.div
        className="absolute -top-20 left-0 w-full h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#6EAEDC] to-transparent shadow-[0_0_20px_rgba(110,174,220,0.5)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Get
            <span className="bg-gradient-to-r from-[#6EAEDC] via-[#427396] to-[#6EAEDC] bg-clip-text text-transparent">
              {" "}
              In Touch
            </span>
          </h2>
          <p className="text-[#898989] text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] border border-[#6EAEDC]/20 rounded-3xl p-8 shadow-2xl shadow-[#6EAEDC]/5"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-[#6EAEDC]/10 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_4px_rgba(110,174,220,0.15)] pointer-events-none" />

              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC]/40 via-[#427396]/40 to-[#6EAEDC]/40 rounded-3xl blur-md -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-4"
                aria-busy={!!loading}
                aria-live="polite"
              >
                {/* Inline messages: text-only, colored; inline styles used to force color */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ color: "#6EE7B7" }} // green (hex) forced inline
                    className="text-sm font-medium tracking-wide"
                  >
                    Message sent — I will get back to you soon!
                  </motion.div>
                )}

                {status === "validate-error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ color: "#FDBA74" }} // orange (hex) forced inline
                    className="text-sm font-medium tracking-wide"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ color: "#FF8A8A" }} // red (hex) forced inline
                    className="text-sm font-medium tracking-wide"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-white/80 text-sm block"
                  >
                    Name
                  </label>
                  <GlassInput
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-white/80 text-sm block"
                  >
                    Email
                  </label>
                  <GlassInput
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-white/80 text-sm block"
                  >
                    Message
                  </label>
                  <div className="relative group">
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#6EAEDC]/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#6EAEDC]/20 outline-none transition-all resize-none"
                    />
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC]/0 to-[#427396]/0 group-focus-within:from-[#6EAEDC]/40 group-focus-within:to-[#427396]/40 rounded-xl blur-md transition-all -z-10" />
                  </div>
                </div>

                <GlassButton
                  type="submit"
                  variant="primary"
                  shape="2xl"
                  className={`w-full justify-center ${
                    loading ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </GlassButton>
              </form>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-white text-2xl">
                Let's talk about your project
              </h3>
              <p className="text-[#898989] leading-relaxed">
                I'm always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.21, 0.45, 0.27, 0.9],
                  }}
                  whileHover={{ x: 12, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="relative backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-xl">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-[#6EAEDC]/5 opacity-60 pointer-events-none" />
                    <motion.div
                      className="absolute -inset-[1px] rounded-2xl -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6EAEDC]/40 to-[#427396]/40 blur-lg" />
                    </motion.div>

                    <div className="relative flex items-center gap-4">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EAEDC]/20 to-[#427396]/20 border border-[#6EAEDC]/30 flex items-center justify-center text-[#6EAEDC]"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        aria-hidden
                      >
                        {info.icon}
                      </motion.div>
                      <div>
                        <div className="text-white/50 text-sm">
                          {info.label}
                        </div>
                        <div className="text-white">
                          {info.href ? (
                            <a href={info.href} className="hover:underline">
                              {info.value}
                            </a>
                          ) : (
                            info.value
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <div className="text-[#898989] text-sm mb-4">Follow me</div>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className="w-12 h-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#898989] hover:text-white hover:border-[#6EAEDC]/50 transition-all"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
