import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { QuickQuoteModal } from './QuickQuoteModal';

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  link: string;
  year: string;
  badge: string;
  isInternal?: boolean;
  isMaintenance?: boolean;
  tags: string[];
}

const projectList: ProjectItem[] = [
  {
    id: 'cvletterai',
    number: '01',
    title: 'CVLetterAI',
    subtitle: 'Executive AI Studio',
    desc: 'Autonomous AI resume & cover letter generation platform with 95% ATS accuracy and sub-second generation.',
    image: '/projects/cvletterai.png',
    link: 'https://cvletterai.org',
    year: '2026',
    badge: 'Live SaaS',
    tags: ['AI Engine', 'SaaS', 'React', 'Tailwind'],
  },
  {
    id: 'batimove',
    number: '02',
    title: 'Batimove Sarl',
    subtitle: 'Premium Swiss Logistics',
    desc: 'High-conversion corporate digital experience for Geneva logistics leader with dynamic estimation engine.',
    image: '/projects/batimove-screenshot.png',
    link: 'https://www.batimove.ch',
    year: '2025',
    badge: 'Client Production',
    tags: ['Web Experience', 'UI/UX', 'SEO', 'React'],
  },
  {
    id: 'montecharge',
    number: '03',
    title: 'Monte Charge',
    subtitle: 'Precision Vertical Logistics',
    desc: 'Interactive booking and fleet rental interface with automated scheduling, instant quotes, and zero latency.',
    image: '/mokupmontecharge.png',
    link: 'https://locationmontecharge.ch',
    year: '2026',
    badge: 'Booking Engine',
    tags: ['Custom Web App', 'Booking Flow', 'React'],
  },
  {
    id: 'labelguard',
    number: '04',
    title: 'LabelGuardUK',
    subtitle: 'Automated Compliance SaaS',
    desc: 'B2B cloud compliance platform verifying product packaging regulations through automated document parsing.',
    image: '/projects/labelguard-screenshot.png',
    link: 'https://www.labelguarduk.co.uk',
    year: '2024',
    badge: 'Maintenance',
    isMaintenance: true,
    tags: ['Compliance', 'Node.js', 'AWS Cloud'],
  },
  {
    id: 'segatt-tools',
    number: '05',
    title: 'Segatt Tools Suite',
    subtitle: 'Neural Utility Engine',
    desc: 'Proprietary performance tuning & latency sniper utilities designed for Windows kernel-level responsiveness.',
    image: '/projects/segatt-v177-dashboard.png',
    link: '/tools',
    year: '2026',
    badge: 'Internal Node',
    isInternal: true,
    tags: ['System Optimizer', 'TypeScript', 'React'],
  },
];

const AISolutions: React.FC = () => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-white selection:bg-[#FF5A00] selection:text-white h-[calc(100vh-125px)] max-h-[900px] flex flex-col justify-between overflow-hidden pt-4 pb-3">
      
      {/* ── Interactive Full-Height Hover Mosaic ── */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 min-h-0 w-full">
        {projectList.map((project) => {
          const isHovered = activeHoverId === project.id;
          const isAnyHovered = activeHoverId !== null;
          const isDimmed = isAnyHovered && !isHovered;

          const panelContent = (
            <div
              className={`relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-5 sm:p-6 ${
                isHovered
                  ? 'border border-[#FF5A00] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,90,0,0.3)] bg-[#0A0A0D]/95'
                  : 'border border-black/30 bg-black/40 shadow-xl shadow-black/20 hover:border-[#FF5A00]/40'
              } ${isDimmed ? 'opacity-35 grayscale-[0.6] scale-[0.99]' : 'opacity-100'}`}
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                    isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-30 group-hover:opacity-45'
                  } ${project.isMaintenance ? 'grayscale' : ''}`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isHovered
                      ? 'bg-gradient-to-t from-black via-black/60 to-transparent'
                      : 'bg-gradient-to-t from-black via-black/80 to-black/30'
                  }`}
                />
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A00]/15 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* ── Top Panel Elements: Number + Badge ── */}
              <div className="relative z-10 flex items-start justify-between">
                <span
                  className={`font-mono text-xl sm:text-2xl font-black tracking-tight transition-colors duration-300 ${
                    isHovered ? 'text-[#FF5A00]' : 'text-white/30'
                  }`}
                >
                  {project.number}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md border transition-all duration-300 ${
                    project.isMaintenance
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : isHovered
                      ? 'bg-[#FF5A00] text-white border-[#FF5A00] shadow-[0_0_15px_rgba(255,90,0,0.6)]'
                      : 'bg-black/50 text-white/70 border border-white/[0.04]'
                  }`}
                >
                  {project.badge}
                </span>
              </div>

              {/* ── Bottom Panel Elements ── */}
              <div className="relative z-10 space-y-3">
                <div>
                  <p className="text-[#FF5A00] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] mb-1">
                    {project.subtitle}
                  </p>
                  <h3
                    className={`font-black tracking-tight text-white transition-all duration-300 ${
                      isHovered ? 'text-2xl sm:text-3xl text-white' : 'text-lg sm:text-xl text-white/90'
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Expanded details revealed on hover */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    isHovered ? 'grid-rows-[1fr] opacity-100 pt-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0 space-y-3">
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md">
                      {project.desc}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.04] text-[9px] font-semibold text-white/80 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action button */}
                    <div className="pt-2">
                      {project.isMaintenance ? (
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/40">
                          <ShieldAlert size={14} />
                          <span>Under Scheduled Maintenance</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5A00] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,90,0,0.5)]">
                          <span>{project.isInternal ? 'Launch Tool' : 'Visit Live Deployment'}</span>
                          <ArrowUpRight size={15} className="stroke-[2.5px]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Year Metadata line */}
                <div className="flex items-center justify-between text-[10px] text-white/30 pt-2 border-t border-white/5">
                  <span className="font-mono">{project.year}</span>
                  <span className="uppercase tracking-widest text-[9px] font-semibold text-white/40">
                    {project.isInternal ? 'Internal Node' : 'Client System'}
                  </span>
                </div>
              </div>
            </div>
          );

          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveHoverId(project.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              className={`h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? 'lg:flex-[2.8] flex-[2]'
                  : isAnyHovered
                  ? 'lg:flex-[0.7] flex-1'
                  : 'flex-1'
              }`}
            >
              {project.isMaintenance ? (
                <div className="h-full cursor-not-allowed">{panelContent}</div>
              ) : project.isInternal ? (
                <Link to={project.link} className="h-full block">
                  {panelContent}
                </Link>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full block"
                >
                  {panelContent}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Minimalist Bottom Action Bar ── */}
      <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 px-1 border-t border-white/5">
        <div className="flex items-center gap-2.5 text-xs text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="font-medium">Available for Custom Websites, SaaS MVPs & AI Architectures</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#FF5A00] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff6f1f] transition-all active:scale-95 shadow-[0_0_20px_rgba(255,90,0,0.35)] cursor-pointer flex items-center gap-2"
          >
            <span>Request a Quote</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AISolutions;
