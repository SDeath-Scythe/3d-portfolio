// src/components/UI/EnhancedHUD.jsx
import React, { useState, useEffect } from 'react';
import './EnhancedHUD.css';
import SoundVisualizer from './SoundVisualizer';

const EnhancedHUD = ({ 
  health = 100, 
  energy = 100, 
  score = 0, 
  planetHits = 0,
  isPointerLocked = false,
  musicEnabled = true
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [scanLines, setScanLines] = useState(true);
  
  // Animate score counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) {
          return Math.min(prev + Math.ceil((score - prev) / 10), score);
        }
        return prev;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [score]);
  
  // Toggle scan lines effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLines(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="enhanced-hud">
      {/* Corner decorations */}
      <div className="hud-corner hud-corner-tl"></div>
      <div className="hud-corner hud-corner-tr"></div>
      <div className="hud-corner hud-corner-bl"></div>
      <div className="hud-corner hud-corner-br"></div>
      
      {/* Top left status - Simplified */}
      <div className="hud-section hud-top-left">
        <div className="hud-title">PORTFOLIO EXPLORER</div>
        <div className="hud-stats">
          <div className="simple-stat">
            <span className="stat-label">EXPLORED:</span>
            <span className="stat-value">{planetHits}/3</span>
          </div>
          <div className="simple-stat">
            <span className="stat-label">SCORE:</span>
            <span className="stat-value score-counter">{animatedScore.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Top right mission info - Simplified */}
      <div className="hud-section hud-top-right">
        <div className="hud-title">STATUS</div>
        <div className="mission-stats">
          <div className="mission-item">
            <span className="mission-label">MODE:</span>
            <span className="mission-value">
              {isPointerLocked ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Bottom center weapon info - Simplified */}
      <div className="hud-section hud-bottom-center">
        <div className="weapon-display">
          <div className="weapon-name">PORTFOLIO EXPLORER</div>
          <div className="weapon-status">
            <span className={`status-dot ${isPointerLocked ? 'active' : 'inactive'}`}></span>
            <span className="weapon-text">
              {isPointerLocked ? 'READY' : 'CLICK TO START'}
            </span>
          </div>
          {/* Only show targeting instruction when no planets have been hit yet */}
          {planetHits === 0 && isPointerLocked && (
            <div className="targeting-instruction">
              <span className="instruction-text">🎯 LOOK FOR GLOWING CYAN RINGS - CLICK PLANETS</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Scan lines effect */}
      {scanLines && <div className="scan-lines"></div>}
      
      {/* Glitch effect overlay */}
      <div className="glitch-overlay"></div>
      
      {/* Sound Visualizer */}
      <SoundVisualizer 
        isActive={musicEnabled && isPointerLocked} 
        volume={energy / 100}
      />
    </div>
  );
};

export default EnhancedHUD;
