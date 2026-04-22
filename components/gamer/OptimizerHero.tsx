import React from 'react';
import { Zap, Globe, Activity } from 'lucide-react';
import GamerMosaic from './GamerMosaic';
import { useLanguage } from '../../utils/i18n';
import './OptimizerHero.css';

const OptimizerHero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="gamer-hero-section" className="hero-section">
      <div className="mosaic-col">
        <GamerMosaic />
      </div>

      <div className="cta-col">
        <div className="content-group">
          <div className="title-group">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('gamer.hero.title').replace('FPS', '<span className="brand-span">FPS</span>') }} />
            <p className="hero-description">
              {t('gamer.hero.desc')}
            </p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stats-grid">
            {[
              { icon: <Zap size={18} />,      label: t('gamer.hero.stat1.label'), detail: t('gamer.hero.stat1.detail') },
              { icon: <Globe size={18} />,     label: t('gamer.hero.stat2.label'), detail: t('gamer.hero.stat2.detail') },
              { icon: <Activity size={18} />,  label: t('gamer.hero.stat3.label'), detail: t('gamer.hero.stat3.detail') },
            ].map((stat: any) => (
              <div key={stat.label} className="stat-item">
                <div className="stat-header">
                  <span className="stat-icon">{stat.icon}</span>
                  {stat.label}
                </div>
                <span className="stat-detail">{stat.detail}</span>
              </div>
            ))}
          </div>

          <div className="divider-line" />

          <div className="specs-footer">
            <span className="specs-item">
              <div className="specs-dot" />
              {t('gamer.hero.footer1')}
            </span>
            <span className="specs-item">
              <div className="specs-dot" />
              {t('gamer.hero.footer2')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizerHero;
