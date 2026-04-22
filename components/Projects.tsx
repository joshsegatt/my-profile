import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectTechRays } from './ProjectTechRays';
import { useLanguage } from '../utils/i18n';

interface Project {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isInternal?: boolean;
}

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({ project, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const cardInner = (
    <div className="relative w-full h-full flex flex-col">
      <ProjectTechRays isActive={isHovered} />

      <div className="relative aspect-[16/8] overflow-hidden bg-black/40 m-0.5 rounded-lg">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.2s] ease-out opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111210] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
                animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-11 h-11 rounded-full bg-brand-yellow text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.4)]"
            >
                <ArrowUpRight size={18} className="stroke-[2.5px]" />
            </motion.div>
        </div>
      </div>

      <div className="px-2.5 pb-2.5 pt-0.5 space-y-0 relative z-10">
        <p className="text-brand-yellow/60 text-[9px] font-bold uppercase tracking-[0.2em]">
          {project.subtitle}
        </p>
        <h3 className="text-white text-[13px] font-bold tracking-tight group-hover:text-brand-yellow transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-2">
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/40 group-hover:bg-brand-yellow animate-pulse" />
                <span className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.15em]">
                    {t('projects.case_study')}
                </span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.1em]">2024</span>
        </div>
      </div>
    </div>
  );

  const containerClasses = "group relative block w-full h-full bg-[#111210]/50 backdrop-blur-sm rounded-[12px] overflow-hidden border border-white/5 hover:border-brand-yellow/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]";

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
    >
        <motion.div
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-full"
        >
            {project.isInternal ? (
                <Link to={project.link} className={containerClasses}>{cardInner}</Link>
            ) : (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={containerClasses}>{cardInner}</a>
            )}
        </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  
  const projects: Project[] = [
    {
      title: "LabelGuardUK",
      subtitle: t('projects.items.labelguard.sub'),
      image: "/projects/labelguard-screenshot.png",
      link: "https://www.labelguarduk.co.uk",
    },
    {
      title: "Batimove Sarl",
      subtitle: t('projects.items.batimove.sub'),
      image: "/projects/batimove-screenshot.png",
      link: "https://www.batimove.ch",
    },
    {
      title: "Segatt Tools Suite",
      subtitle: t('projects.items.segatt.sub'),
      image: "/projects/segatt-v177-dashboard.png",
      link: "/tools",
      isInternal: true
    },
  ];

  return (
    <section id="portfolio" className="relative overflow-hidden py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-2"
            >
                <div className="w-8 h-[2px] bg-brand-yellow" />
                <span className="text-brand-yellow text-[11px] font-bold uppercase tracking-[0.3em]">{t('projects.label')}</span>
            </motion.div>
            <h2 className="text-white text-3xl lg:text-[42px] font-extrabold tracking-tighter leading-[1.1]">
                {t('projects.title')} <span className="text-white/20">/ {t('projects.subtitle')}</span>
            </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
