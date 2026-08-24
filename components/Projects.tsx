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
  year?: string;
  isInternal?: boolean;
  isMaintenance?: boolean;
  businessROI?: string[];
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
            {project.isMaintenance ? (
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Under Maintenance</span>
                </div>
            ) : (
                <motion.div 
                    animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-11 h-11 rounded-full bg-brand-yellow text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,90,0,0.4)]"
                >
                    <ArrowUpRight size={18} className="stroke-[2.5px]" />
                </motion.div>
            )}
        </div>
        {project.isMaintenance && (
            <div className="absolute top-0 right-0 bg-red-500/90 text-white text-[8px] font-black uppercase px-6 py-1 rotate-45 translate-x-[20px] translate-y-[10px] shadow-lg z-20">
                Offline
            </div>
        )}
      </div>

      <div className="px-2.5 pb-2.5 pt-0.5 space-y-0 relative z-10">
        <p className="text-brand-yellow/60 text-[9px] font-bold uppercase tracking-[0.2em]">
          {project.subtitle}
        </p>
        <h3 className="text-white text-[13px] font-bold tracking-tight group-hover:text-brand-yellow transition-colors duration-300">
          {project.title}
        </h3>

        {project.businessROI && project.businessROI.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            {project.businessROI.map((roi, idx) => (
              <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/5 text-[8.5px] font-medium text-white/80 uppercase tracking-widest whitespace-nowrap">
                {roi}
              </span>
            ))}
          </div>
        )}
        
        <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-2">
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/40 group-hover:bg-brand-yellow animate-pulse" />
                <span className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.15em]">
                    {t('projects.case_study')}
                </span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.1em]">{project.year || '2024'}</span>
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
            {project.isMaintenance ? (
                <div className={`${containerClasses} cursor-not-allowed grayscale-[0.5] opacity-80`}>{cardInner}</div>
            ) : project.isInternal ? (
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
      title: "CVLetterAI",
      subtitle: t('projects.items.cvletterai.sub'),
      image: "/projects/cvletterai.png",
      link: "https://cvletterai.org",
      year: "2026",
      businessROI: [t('projects.items.cvletterai.roi1'), t('projects.items.cvletterai.roi2')]
    },
    {
      title: "LabelGuardUK",
      subtitle: t('projects.items.labelguard.sub'),
      image: "/projects/labelguard-screenshot.png",
      link: "https://www.labelguarduk.co.uk",
      year: "2024",
      isMaintenance: true,
      businessROI: [t('projects.items.labelguard.roi1'), t('projects.items.labelguard.roi2')]
    },
    {
      title: "Batimove Sarl",
      subtitle: t('projects.items.batimove.sub'),
      image: "/projects/batimove-screenshot.png",
      link: "https://www.batimove.ch",
      year: "2025",
      businessROI: [t('projects.items.batimove.roi1'), t('projects.items.batimove.roi2')]
    },
    {
      title: "Monte Charge",
      subtitle: t('projects.items.montecharge.sub'),
      image: "/mokupmontecharge.png",
      link: "https://locationmontecharge.ch",
      year: "2026",
      businessROI: [t('projects.items.montecharge.roi1'), t('projects.items.montecharge.roi2')]
    },
    {
      title: "Segatt Tools Suite",
      subtitle: t('projects.items.segatt.sub'),
      image: "/projects/segatt-v177-dashboard.png",
      link: "/tools",
      year: "2026",
      isInternal: true,
      businessROI: [t('projects.items.segatt.roi1'), t('projects.items.segatt.roi2')]
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
            <div key={idx}>
              <ProjectCard project={project} delay={idx * 0.05} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
