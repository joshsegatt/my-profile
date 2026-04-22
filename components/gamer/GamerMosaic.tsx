import React, { memo } from 'react';
import { motion } from 'framer-motion';
import './GamerMosaic.css';

// Using high-quality user assets for a premium global gaming vibe
const MOSAIC_ASSETS = [
  { 
    type: 'video', 
    path: '/assets/videos/main_4k.mp4', 
    className: 'span-main vibrant-4k',
    label: '4K TACTICAL FEED' 
  },
  { 
    type: 'image', 
    path: '/assets/images/fps_valorant.jpg', 
    className: 'span-small',
    label: 'VALORANT' 
  },
  { 
    type: 'image', 
    path: '/assets/images/fps_cs2.jpg', 
    className: 'span-small',
    label: 'CS2' 
  },
  { 
    type: 'image', 
    path: '/assets/images/fps_apex.jpg', 
    className: 'span-small',
    label: 'APEX LEGENDS' 
  },
  { 
    type: 'image', 
    path: '/assets/images/fps_cod.jpg', 
    className: 'span-small',
    label: 'CALL OF DUTY' 
  },
];

const GamerMosaic: React.FC = () => {
  return (
    <div className="mosaic-container">
      {MOSAIC_ASSETS.map((asset, idx) => (
        <motion.div
          key={`${asset.label}-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
          className={`mosaic-tile ${asset.className}`}
        >
          {asset.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="mosaic-video"
            >
              <source src={asset.path} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={asset.path} 
              alt={asset.label} 
              loading="eager"
              className="mosaic-image"
            />
          )}

          {/* Tactical Label (Bottom Right) */}
          <div className="tile-label">
            {asset.label}
          </div>

          {/* Overlays */}
          <div className="mosaic-overlay" />
          <div className="mosaic-scanlines" />
        </motion.div>
      ))}
    </div>
  );
};

export default memo(GamerMosaic);
