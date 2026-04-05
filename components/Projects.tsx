import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "LabelGuardUK",
      subtitle: "Automated Compliance SaaS",
      image: "/projects/labelguard-screenshot.png",
      link: "https://www.labelguarduk.co.uk",
    },
    {
      title: "Batimove",
      subtitle: "Premium Swiss Moving Services",
      image: "/projects/batimove-screenshot.png",
      link: "https://www.batimove.ch",
    },
    {
      title: "Segatt Tools v1.5.0",
      subtitle: "Neural Core Utility Engine",
      image: "/assets/projects/segatt-v150-dashboard.png",
      link: "/tools",
    },
  ];

  return (
    <section id="portfolio" className="py-12 relative overflow-hidden">
      <div className="w-full">
        <h2 className="text-white text-xl lg:text-2xl font-bold mb-10 flex items-center gap-4">
          Featured Projects
          <div className="h-[1px] flex-1 bg-white/5" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <motion.a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-brand-card rounded-3xl overflow-hidden border border-white/5 hover:border-brand-yellow/20 transition-all duration-500 shadow-2xl"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Hover Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-brand-yellow text-black flex items-center justify-center shadow-2xl">
                        <ArrowUpRight size={20} className="stroke-[3px]" />
                    </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-2">
                <h3 className="text-white text-lg font-bold tracking-tight group-hover:text-brand-yellow transition-colors">
                  {project.title}
                </h3>
                <p className="text-brand-textSecondary text-xs font-bold uppercase tracking-widest opacity-60">
                  {project.subtitle}
                </p>
                
                <div className="pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        View Case Study
                    </span>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        2024
                    </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
