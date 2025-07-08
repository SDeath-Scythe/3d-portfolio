// src/components/UI/ControlsPanel.jsx
import React from 'react';

const ControlsPanel = () => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '30px',
      right: '30px',
      color: '#00d4ff',
      fontSize: '11px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: 'rgba(0, 20, 40, 0.9)',
      padding: '10px 15px',
      borderRadius: '6px',
      border: '1px solid rgba(0, 212, 255, 0.4)',
      zIndex: 150,
      pointerEvents: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      maxWidth: '300px'
    }}>
      <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: '6px' }}>
        ⚡ TACTICAL CONTROLS
      </div>
      <div style={{ marginBottom: '4px' }}>🎯 Click to enter Combat Mode</div>
      <div>🏃 WASD - Movement</div>
      <div>🎮 Mouse - Aim</div>
      <div>💥 Left Click - Fire</div>
      <div>� Right Click - Revive Planet</div>
      <div>⚡ Shift - Run</div>
      <div>🚀 Space - Jump</div>
      <div>⬇️ C - Fly Down</div>
    </div>
  );
};

export default ControlsPanel;
