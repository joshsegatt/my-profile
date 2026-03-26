
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
      title: "LabelGuardUK | Compliance Automated",
      subtitle: "SaaS & AI - United Kingdom",
      image: "/projects/labelguard-screenshot.png",
      link: "https://www.labelguarduk.co.uk",
    },
    {
      title: "Batimove | Premium Moving Services",
      subtitle: "Moving & Tech - Switzerland",
      image: "/projects/batimove-screenshot.png",
      link: "https://www.batimove.ch",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <motion.a
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 lg:p-5 shadow-[inset_0_1px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-500 cursor-pointer w-full block"
            >
              <div className="relative aspect-video w-full bg-brand-black rounded-[24px] overflow-hidden mb-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-90 group-hover:opacity-100"
                />
                {/* Premium Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
                <div className="absolute inset-0 rounded-[24px] border border-white/10 pointer-events-none mix-blend-screen" />
              </div>
              <div className="px-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-brand-textPrimary text-[18px] lg:text-[22px] font-bold mb-1.5 tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-brand-textSecondary text-[13px] lg:text-[14px] font-medium opacity-80">
                    {project.subtitle}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transform group-hover:bg-brand-textPrimary group-hover:text-brand-black group-hover:rotate-45 transition-all duration-500 flex-shrink-0 ml-4">
                  <ArrowUpRight size={20} className="text-brand-textPrimary group-hover:text-brand-black transition-colors" />
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
