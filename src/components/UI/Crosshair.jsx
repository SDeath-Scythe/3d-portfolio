// src/components/UI/Crosshair.jsx
import React from 'react';

const Crosshair = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 100,
    }}>
      {/* Enhanced center dot with glow */}
      <div style={{
        position: 'absolute',
        top: '-3px',
        left: '-3px',
        width: '6px',
        height: '6px',
        background: 'radial-gradient(circle, #00ffff, #0099ff)',
        borderRadius: '50%',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(0, 255, 255, 0.5)',
        animation: 'crosshairPulse 2s ease-in-out infinite'
      }}></div>
      
      {/* Top line with gradient */}
      <div style={{
        position: 'absolute',
        top: '-18px',
        left: '-1.5px',
        width: '3px',
        height: '12px',
        background: 'linear-gradient(to bottom, transparent, #00ffff, transparent)',
        borderRadius: '2px',
        boxShadow: '0 0 8px rgba(0, 255, 255, 0.7)'
      }}></div>
      
      {/* Bottom line with gradient */}
      <div style={{
        position: 'absolute',
        top: '6px',
        left: '-1.5px',
        width: '3px',
        height: '12px',
        background: 'linear-gradient(to top, transparent, #00ffff, transparent)',
        borderRadius: '2px',
        boxShadow: '0 0 8px rgba(0, 255, 255, 0.7)'
      }}></div>
      
      {/* Left line with gradient */}
      <div style={{
        position: 'absolute',
        top: '-1.5px',
        left: '-18px',
        width: '12px',
        height: '3px',
        background: 'linear-gradient(to right, transparent, #00ffff, transparent)',
        borderRadius: '2px',
        boxShadow: '0 0 8px rgba(0, 255, 255, 0.7)'
      }}></div>
      
      {/* Right line with gradient */}
      <div style={{
        position: 'absolute',
        top: '-1.5px',
        right: '-18px',
        width: '12px',
        height: '3px',
        background: 'linear-gradient(to left, transparent, #00ffff, transparent)',
        borderRadius: '2px',
        boxShadow: '0 0 8px rgba(0, 255, 255, 0.7)'
      }}></div>
      
      {/* Corner brackets for tactical feel */}
      <div style={{
        position: 'absolute',
        top: '-25px',
        left: '-25px',
        width: '15px',
        height: '15px',
        border: '2px solid rgba(0, 255, 255, 0.6)',
        borderRight: 'none',
        borderBottom: 'none',
        borderRadius: '3px 0 0 0'
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: '-25px',
        right: '-25px',
        width: '15px',
        height: '15px',
        border: '2px solid rgba(0, 255, 255, 0.6)',
        borderLeft: 'none',
        borderBottom: 'none',
        borderRadius: '0 3px 0 0'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-25px',
        left: '-25px',
        width: '15px',
        height: '15px',
        border: '2px solid rgba(0, 255, 255, 0.6)',
        borderRight: 'none',
        borderTop: 'none',
        borderRadius: '0 0 0 3px'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-25px',
        right: '-25px',
        width: '15px',
        height: '15px',
        border: '2px solid rgba(0, 255, 255, 0.6)',
        borderLeft: 'none',
        borderTop: 'none',
        borderRadius: '0 0 3px 0'
      }}></div>
      
      {/* Add CSS animation */}
      <style>{`
        @keyframes crosshairPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Crosshair;
