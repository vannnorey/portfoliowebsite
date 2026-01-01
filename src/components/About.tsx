import { motion } from "motion/react";
import { Code, Palette, PenTool, Zap, Award } from "lucide-react";

export function About() {
  const skills = [
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description:
        "Designing user-centered interfaces for mobile and web applications",
    },
    {
      icon: <PenTool size={24} />,
      title: "Graphic Design",
      description:
        "Creating posters, icons, and visual assets for branding and communication",
    },
    {
      icon: <Code size={24} />,
      title: "Front-End Design",
      description:
        "Building responsive, performant web applications with technologies",
    },
    // {
    //   icon: <Zap size={24} />,
    //   title: "Motion Design",
    //   description:
    //     "Crafting smooth animations and micro-interactions that delight users",
    // },
    // {
    //   icon: <Award size={24} />,
    //   title: "Brand Identity",
    //   description:
    //     "Developing cohesive visual systems that tell compelling stories",
    // },
  ];

  const stats = [
    { value: "2+", label: "Projects Completed" },
    { value: "2+", label: "Design Practice" },
    // { value: "1+", label: "Design Practice" },
    // { value: "Figma", label: "Expertise" },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Scroll activated neon glow */}
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            About
            <span className="bg-gradient-to-r from-[#6EAEDC] via-[#427396] to-[#6EAEDC] bg-clip-text text-transparent">
              {" "}
              Me
            </span>
          </h2>
          <p className="text-[#898989] text-lg max-w-2xl mx-auto">
            Passionate about designing intuitive digital experiences with a focus on clarity and usability
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glass Bio Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] border border-[#6EAEDC]/20 rounded-3xl p-8 shadow-2xl shadow-[#6EAEDC]/5"
            >
              {/* ISO reflection */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-[#6EAEDC]/10 opacity-60 pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_2px_4px_rgba(110,174,220,0.15)] pointer-events-none" />

              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-[#6EAEDC]/40 via-[#427396]/40 to-[#6EAEDC]/40 rounded-3xl blur-md -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative space-y-6">
                {/* Avatar */}
                <motion.div
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6EAEDC] to-[#427396] shadow-lg shadow-[#6EAEDC]/40 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/image/bg_1.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Bio Text */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-white text-2xl">N.Vannorey</h3>
                  <p className="text-white/50 leading-relaxed">
                    I’m Nop Vannnorey — a newly graduated UX/UI Designer who loves turning ideas into meaningful digital experiences. My background in Computer Science and passion for design help me blend creativity with usability to craft intuitive, visually engaging interfaces.
                  </p>
                  <p className="text-white/50 leading-relaxed">
                    Whether it’s a mobile app or a web system, I design with purpose, clarity, and user needs at the center.
                  </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-2 gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="backdrop-blur-xl bg-white/5 border border-[#6EAEDC]/20 rounded-xl p-4 text-center cursor-default"
                    >
                      <motion.div
                        className="text-[#6EAEDC] text-2xl mb-1"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.4 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-white/50 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Skills Grid */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.9],
                }}
                whileHover={{ x: 12, scale: 1.02 }}
                className="relative group"
              >
                {/* Glass Skill Card */}
                <div className="relative backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-xl">
                  {/* ISO reflection */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-[#6EAEDC]/5 opacity-60 pointer-events-none" />

                  {/* Neon glow on hover */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-2xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6EAEDC]/40 to-[#427396]/40 blur-lg" />
                  </motion.div>

                  <div className="relative flex gap-4">
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EAEDC]/20 to-[#427396]/20 border border-[#6EAEDC]/30 flex items-center justify-center text-[#6EAEDC]"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-white text-lg">{skill.title}</h4>
                      <p className="text-white/50">{skill.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
