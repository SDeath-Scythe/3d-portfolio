// src/components/UI/EnhancedCrosshair.jsx
import React, { useState, useEffect } from 'react';
import './EnhancedCrosshair.css';

const EnhancedCrosshair = ({ isActive = false, targetLocked = false }) => {
  const [pulse, setPulse] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  
  useEffect(() => {
    // Pulse animation for active state
    if (isActive) {
      const interval = setInterval(() => {
        setPulse(prev => !prev);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isActive]);
  
  useEffect(() => {
    // Scan animation when target is locked
    if (targetLocked) {
      setScanAnimation(true);
      const timeout = setTimeout(() => {
        setScanAnimation(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [targetLocked]);
  
  return (
    <div className={`crosshair-container ${isActive ? 'active' : ''} ${targetLocked ? 'locked' : ''}`}>
      {/* Dynamic center dot */}
      <div className={`crosshair-center ${pulse ? 'pulse' : ''}`}></div>
      
      {/* Animated crosshair lines */}
      <div className="crosshair-line crosshair-top"></div>
      <div className="crosshair-line crosshair-right"></div>
      <div className="crosshair-line crosshair-bottom"></div>
      <div className="crosshair-line crosshair-left"></div>
      
      {/* Corner brackets */}
      <div className="crosshair-bracket crosshair-bracket-tl"></div>
      <div className="crosshair-bracket crosshair-bracket-tr"></div>
      <div className="crosshair-bracket crosshair-bracket-bl"></div>
      <div className="crosshair-bracket crosshair-bracket-br"></div>
      
      {/* Scanning ring */}
      {scanAnimation && (
        <div className="crosshair-scan-ring">
          <div className="scan-ring-inner"></div>
        </div>
      )}
      
      {/* Target lock indicator */}
      {targetLocked && (
        <div className="target-lock-indicator">
          <div className="lock-text">TARGET ACQUIRED</div>
        </div>
      )}
      
      {/* Energy level indicator */}
      <div className="crosshair-energy-rings">
        <div className="energy-ring ring-1"></div>
        <div className="energy-ring ring-2"></div>
        <div className="energy-ring ring-3"></div>
      </div>
    </div>
  );
};

export default EnhancedCrosshair;
