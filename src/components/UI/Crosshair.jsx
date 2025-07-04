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
      zIndex: 10,
    }}>
      {/* Center dot */}
      <div style={{
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        width: '4px',
        height: '4px',
        backgroundColor: 'cyan',
        borderRadius: '50%',
        boxShadow: '0 0 4px rgba(0, 255, 255, 0.8)'
      }}></div>
      
      {/* Top line */}
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '-1px',
        width: '2px',
        height: '8px',
        backgroundColor: 'cyan',
        boxShadow: '0 0 2px rgba(0, 255, 255, 0.6)'
      }}></div>
      
      {/* Bottom line */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '-1px',
        width: '2px',
        height: '8px',
        backgroundColor: 'cyan',
        boxShadow: '0 0 2px rgba(0, 255, 255, 0.6)'
      }}></div>
      
      {/* Left line */}
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: '-12px',
        width: '8px',
        height: '2px',
        backgroundColor: 'cyan',
        boxShadow: '0 0 2px rgba(0, 255, 255, 0.6)'
      }}></div>
      
      {/* Right line */}
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: '4px',
        width: '8px',
        height: '2px',
        backgroundColor: 'cyan',
        boxShadow: '0 0 2px rgba(0, 255, 255, 0.6)'
      }}></div>
    </div>
  );
};

export default Crosshair;
