import React from 'react';
import { Zap, Globe, Activity } from 'lucide-react';
import GamerMosaic from './GamerMosaic';
import './OptimizerHero.css';

const OptimizerHero: React.FC = () => {
  return (
    <section className="hero-section">
      
      {/* Left Column: Cinematic Mosaic */}
      <div className="mosaic-col">
        <GamerMosaic />
      </div>

      {/* Right Column: CTA Content */}
      <div className="cta-col">
        <div className="content-group">


          <div className="title-group">
            <h1 className="hero-title">
              Squeeze every <br />
              <span className="brand-span">FPS</span> from your <br />
              battle rig.
            </h1>
            <p className="hero-description">
              Enterprise-grade performance tuning. Our neural engine eliminates micro-stutters and 
              stabilizes frame-pacing for absolute competitive advantage.
            </p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stats-grid">
            {[
              { icon: <Zap size={18} />,      label: '+30-60 AVG FPS', detail: 'Guaranteed boost' },
              { icon: <Globe size={18} />,     label: '-40MS PING',    detail: 'Latency optimized' },
              { icon: <Activity size={18} />,  label: 'LOW DPC',       detail: 'Priority handling' },
            ].map(stat => (
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
              Direct-X 12 + Vulkan
            </span>
            <span className="specs-item">
              <div className="specs-dot" />
              Windows 11 Optimized
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizerHero;
