import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "UX/UI Design",
      description:
        "Product browsing experience designed for clarity and ease",
      tags: ["Web", "Mobile", "E-Commerce"],
      image: "/image/clothes.png",
      link: "https://www.figma.com/design/M2W4QaMeKNhDvGm6v1eJbK/E-Commerce-Clothes?node-id=384-4218&t=hPYQrSqQAuPdGlG4-1",
    },
    {
      title: "Food Ordering",
      category: "UX/UI Design",
      description:
        "Simple mobile experience for browsing menus and placing orders",
      tags: ["Mobile", "UX/UI", "Animation"],
      image: "/image/nhamnham.png",
      link: "https://www.figma.com/design/3PLf96I8J393KtMcHNpisH/Food-Delivery?node-id=81-29211&t=nwI4Jy7XnLuowKPd-1",
    },
    {
      title: "Job Announcement",
      category: "UI/UX Design",
      description: "Mobile interface for exploring job posts with an easy, intuitive flow",
      tags: ["Mobile", "UI/UX" ],
      image: "/image/findjob.png",
      link: "https://www.figma.com/design/5BwnZHDfP11UvEYLALf2jZ/Job-Announcement?node-id=83-9741&t=N2MBquRVH2NaZc9e-1",
    },
    {
      title: "Furniture Shop Website",
      category: "UI Design",
      description: "Modern e-commerce layout for browsing furniture products",
      tags: ["Web", "E-Commerce"],
      image: "/image/furniture.png",
      link: "https://www.figma.com/design/ceTvdC8w9EnnfB9ZXmVGyq/Furniture-Ecommerce?node-id=2023-92&t=bMCkJ7Plw45ZuqFh-1",
    },
    {
      title: "Electronics Shop",
      category: "UI Design",
      description: "Easy and structured electronics browsing experience",
      tags: ["Web", "Mobile", "Destkop"],
      image: "/image/electronics.png",
      link: "https://www.figma.com/design/f4wcyp2qKAQzFYMrfgP26s/Electronics-Store?node-id=51-137&t=bCuE89X74zM1cizi-1",
    },
    {
      title: "Portfolio",
      category: "UI Design",
      description: "Modern, clean layout showcasing my projects and design style",
      tags: ["Interface", "Behance"],
      image: "/image/portfolio.png",
      link: "https://www.behance.net/gallery/230355477/UIUX-Portfolio",
    },
  ];

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Simple gradient line - no animation */}
      <div className="absolute -top-20 left-0 w-full h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#6EAEDC] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header - no animation */}
        <div className="text-center mb-16 space-y-4">
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
        </div>

        {/* Projects Grid - no stagger */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              index={0} key={project.title}
              {...project}            />
          ))}
        </div>
      </div>
    </section>
  );
}