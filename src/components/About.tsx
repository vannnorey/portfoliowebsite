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
  ];

  const stats = [
    { value: "3+", label: "Projects Completed" },
    { value: "2+", label: "Design Practice" },
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Simple gradient line - no animation */}
      <div className="absolute -top-20 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#6EAEDC] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header - no animation */}
        <div className="text-center mb-16 space-y-4">
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
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Bio Card */}
          <div className="relative">
            {/* Glass Bio Card - no hover */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] border border-[#6EAEDC]/20 rounded-3xl p-8 shadow-2xl">
              {/* ISO reflection */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-[#6EAEDC]/10 opacity-60 pointer-events-none" />
              
              <div className="relative space-y-6">
                {/* Avatar - no rotate */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6EAEDC] to-[#427396] shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/image/bg_1.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bio Text */}
                <div className="space-y-4">
                  <h3 className="text-white text-2xl">N.Vannorey</h3>
                  <p className="text-white/50 leading-relaxed">
                    I’m Nop Vannnorey — a newly graduated UX/UI Designer who loves turning ideas into meaningful digital experiences. My background in Computer Science and passion for design help me blend creativity with usability to craft intuitive, visually engaging interfaces.
                  </p>
                  <p className="text-white/50 leading-relaxed">
                    Whether it’s a mobile app or a web system, I design with purpose, clarity, and user needs at the center.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-xl bg-white/5 border border-[#6EAEDC]/20 rounded-xl p-4 text-center"
                    >
                      <div className="text-[#6EAEDC] text-2xl mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/50 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Skills Grid */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="relative">
                {/* Glass Skill Card - no hover effects */}
                <div className="relative backdrop-blur-2xl bg-white/[0.06] border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="relative flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EAEDC]/20 to-[#427396]/20 border border-[#6EAEDC]/30 flex items-center justify-center text-[#6EAEDC]">
                      {skill.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-white text-lg">{skill.title}</h4>
                      <p className="text-white/50">{skill.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}