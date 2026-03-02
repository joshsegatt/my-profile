
import React from 'react';

const PaintStrokes: React.FC = () => {
  return (
    <svg 
      viewBox="0 0 400 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full drop-shadow-lg"
    >
      {/* Red Stroke */}
      <path 
        d="M50 100C120 80 200 150 180 280C160 410 80 450 60 550" 
        stroke="#E63946" 
        strokeWidth="60" 
        strokeLinecap="round" 
        style={{ opacity: 0.8 }}
      />
      {/* Cyan Stroke */}
      <path 
        d="M100 50C150 120 80 220 120 350C160 480 200 520 150 580" 
        stroke="#00CED1" 
        strokeWidth="45" 
        strokeLinecap="round" 
        style={{ opacity: 0.7 }}
      />
      {/* Yellow Stroke */}
      <path 
        d="M30 150C80 200 120 180 140 320C160 460 100 500 40 540" 
        stroke="#FFD700" 
        strokeWidth="35" 
        strokeLinecap="round" 
        style={{ opacity: 0.9 }}
      />
      {/* Orange Stroke */}
      <path 
        d="M80 80C60 180 150 250 130 400C110 550 60 580 90 590" 
        stroke="#FF8C00" 
        strokeWidth="25" 
        strokeLinecap="round" 
        style={{ opacity: 0.75 }}
      />
      {/* Black Splatters/Details */}
      <circle cx="90" cy="180" r="5" fill="black" />
      <circle cx="140" cy="350" r="8" fill="black" />
      <circle cx="70" cy="480" r="6" fill="black" />
      <path d="M110 120 L130 160" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 400 L90 440" stroke="black" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};

export default PaintStrokes;
