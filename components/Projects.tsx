
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="portfolio" className="bg-brand-hero py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative Blur for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-brand-hero to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto relative z-20">
        <h2 className="text-center text-brand-textTertiary text-[12px] font-bold tracking-[3px] uppercase mb-16">
          Selected Works
        </h2>

        <div className="flex justify-center">
          {projects.map((project, idx) => (
            <motion.a
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={idx}
              href="https://www.batimove.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-4 lg:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_40px_80px_rgba(0,0,0,0.08)] cursor-pointer w-full max-w-[800px] block"
            >
              <div className="relative aspect-video w-full bg-black/5 rounded-[24px] overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="px-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-brand-black text-[18px] lg:text-[22px] font-bold mb-1.5 tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-textSecondary text-[13px] lg:text-[14px] font-medium opacity-80">
                    {project.subtitle}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-black/5 bg-brand-hero flex items-center justify-center transform group-hover:bg-brand-black group-hover:text-white group-hover:rotate-45 transition-all duration-500 shadow-sm">
                  <ArrowUpRight size={20} className="text-brand-black group-hover:text-white transition-colors" />
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
