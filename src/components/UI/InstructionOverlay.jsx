// src/components/UI/InstructionOverlay.jsx
import React, { useState, useEffect } from 'react';
import './InstructionOverlay.css';

const InstructionOverlay = ({ visible = true }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(visible);

  const tips = [
    {
      icon: '🎯',
      title: 'CLICK THE GLOWING PLANETS',
      description: 'Look for planets with cyan rings and click to explore my portfolio!',
      color: '#00ffff'
    },
    {
      icon: '🔄',
      title: 'RIGHT CLICK TO REVIVE',
      description: 'Right-click destroyed planets to bring them back.',
      color: '#ffff44'
    }
  ];

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visible, tips.length]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  const currentTipData = tips[currentTip];

  return (
    <div className="instruction-overlay">
      <div className="instruction-card">
        <div className="instruction-header">
          <span className="instruction-icon">{currentTipData.icon}</span>
          <h3 style={{ color: currentTipData.color }}>{currentTipData.title}</h3>
        </div>
        <p>{currentTipData.description}</p>
        <div className="instruction-indicators">
          {tips.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentTip ? 'active' : ''}`}
              style={{ 
                backgroundColor: index === currentTip ? currentTipData.color : 'rgba(255, 255, 255, 0.3)' 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructionOverlay;
