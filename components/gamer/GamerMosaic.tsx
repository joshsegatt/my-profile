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

const MosaicTile: React.FC<{ asset: any, idx: number }> = ({ asset }) => {
  // We keep the loaded state for smooth transition, but remove the initial mount delay
  const [isReady, setIsReady] = React.useState(false);

  return (
    <div className={`mosaic-tile ${asset.className} bg-white/5`}>
      {/* Remove explicit skeleton to prevent pulse flickering, use container background as fallback */}
      
      {asset.type === 'video' ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`mosaic-video transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
          onLoadedData={() => setIsReady(true)}
        >
          <source src={asset.path} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={asset.path} 
          alt={asset.label} 
          loading="eager"
          className={`mosaic-image transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsReady(true)}
        />
      )}

      {/* Tactical Label */}
      <div className="tile-label">
        {asset.label}
      </div>

      <div className="mosaic-overlay" />
      <div className="mosaic-scanlines" />
    </div>
  );
};

const GamerMosaic: React.FC = () => {
  return (
    <div className="mosaic-container">
      {MOSAIC_ASSETS.map((asset, idx) => (
        <MosaicTile key={`${asset.label}-${idx}`} asset={asset} idx={idx} />
      ))}
    </div>
  );
};

export default memo(GamerMosaic);
