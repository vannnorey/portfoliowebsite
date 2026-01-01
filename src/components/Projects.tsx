import { motion } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";

export function Projects() {
  const [image, setImages] = useState<string[]>([]);
 
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "UX/UI Design",
      description:
        "Product browsing experience designed for clarity and ease",
      tags: ["Web", "Mobile", "E-Commerce"],
      image: "/image/clothes.png",
      link: "https://www.figma.com/design/M2W4QaMeKNhDvGm6v1eJbK/E-Commerce-Clothes?node-id=1-2&t=84YLpIeQZoRavttz-1",
    },
    {
      title: "Food Ordering",
      category: "UX/UI Design",
      description:
        "Simple mobile experience for browsing menus and placing orders",
      tags: ["Mobile", "UX/UI", "Animation"],
      image: "/image/nhamnham.png",
      link: "https://www.figma.com/design/3PLf96I8J393KtMcHNpisH/Food-Delivery?node-id=0-1&t=gMOxSYMwWL2DGKaQ-1",
    },
    {
      title: "Job Announcement",
      category: "UI/UX Design",
      description: "Mobile interface for exploring job posts with an easy, intuitive flow",
      tags: ["Mobile", "UI/UX" ],
      image: "/image/findjob.png",
      link: "https://www.figma.com/design/5BwnZHDfP11UvEYLALf2jZ/Job-Announcement?node-id=0-1&t=gMOxSYMwWL2DGKaQ-1",
    },
    {
      title: "Furniture Shop Website",
      category: "UI Design",
      description: "Modern e-commerce layout for browsing furniture products",
      tags: ["Web", "E-Commerce"],
      image: "/image/furniture.png",
      link: "https://www.figma.com/design/ceTvdC8w9EnnfB9ZXmVGyq/Furniture-Ecommerce?node-id=0-1&t=gMOxSYMwWL2DGKaQ-1",
    },
    {
      title: "Electronics Shop",
      category: "UI Design",
      description: "Easy and structured electronics browsing experience",
      tags: ["Web", "Mobile", "Destkop"],
      image: "/image/electronics.png",
      link: "https://www.figma.com/design/f4wcyp2qKAQzFYMrfgP26s/Electronics-Store?node-id=0-1&t=gMOxSYMwWL2DGKaQ-1",
    },
    {
      title: "Poster",
      category: "Graphic Design",
      description: "Poster design collection with clean and modern visuals.",
      tags: ["Photoshop", "Illustrator", "Figma"],
      image: "/image/graphic.jpg",
      link: "https://dribbble.com/vann_norey/about?utm_source=Clipboard_%22clipboard_about%22&utm_campaign=%22vann_norey%22&utm_content=%22About%20vann_norey%22&utm_medium=Social_Share",
    },
  ];

  useEffect(() => {
    // We'll set placeholder images initially
    setImages(Array(6).fill(""));
  }, []);

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Gradient wave transition with scroll trigger */}
      <motion.div
        className="absolute -top-20 left-0 w-full h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#6EAEDC] to-transparent shadow-[0_0_20px_rgba(110,174,220,0.6)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header with layered blur dissolve */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Featured
            <span className="bg-gradient-to-r from-[#6EAEDC] via-white to-[#427396] bg-clip-text text-transparent">
              {" "}
              Projects
            </span>
          </h2>
          <p className="text-[#898989] text-lg max-w-2xl mx-auto tracking-wide">
            Recent UX/UI design projects crafted with research-driven decisions and modern design principles.
          </p>
        </motion.div>

        {/* Projects Grid with staggered orchestration */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              image={project.image}
              link={project.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
