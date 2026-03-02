
import React from 'react';

interface Project {
  title: string;
  subtitle: string;
  image: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Batimove | Premium Moving Services",
      subtitle: "Moving & Tech - Switzerland",
      image: "/projects/batimove-screenshot.png",
    },
  ];

  return (
    <section id="portfolio" className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-brand-textTertiary text-[14px] font-bold tracking-[2px] uppercase mb-16">
          MY LATEST WORK
        </h2>

        <div className="flex justify-center">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href="https://www.batimove.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white project-card-shadow transition-all duration-300 transform hover:-translate-y-2 cursor-pointer rounded-sm overflow-hidden w-full max-w-[600px] block"
            >
              <div className="aspect-video w-full bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-[20px]">
                <h3 className="text-brand-textSecondary text-[16px] font-medium mb-1">
                  {project.title}
                </h3>
                <p className="text-brand-textTertiary text-[14px]">
                  {project.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
