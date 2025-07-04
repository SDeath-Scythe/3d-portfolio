// src/components/UI/ControlsPanel.jsx
import React from 'react';

const ControlsPanel = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: '#00d4ff',
      fontSize: '13px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: 'rgba(0, 20, 40, 0.85)',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid rgba(0, 212, 255, 0.3)',
      zIndex: 15,
      pointerEvents: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: '8px' }}>
        ⚡ TACTICAL SHOOTER
      </div>
      <div>🎯 Click to enter Combat Mode</div>
      <div>🏃 WASD - Movement</div>
      <div>🎮 Mouse - Aim</div>
      <div>💥 Left Click - Fire</div>
      <div>� Right Click - Revive Planet</div>
      <div>⚡ Shift - Run</div>
      <div>🚀 Space - Jump</div>
      <div>⬇️ C - Fly Down</div>
      <div>🔄 R - Reset Camera</div>
      <div style={{ marginTop: '8px', borderTop: '1px solid rgba(0, 212, 255, 0.3)', paddingTop: '8px' }}>
        <div style={{ color: '#00ffff', fontWeight: 'bold', marginBottom: '4px' }}>🎵 AUDIO</div>
        <div>🎶 M - Toggle Music</div>
        <div>🔊 N - Toggle SFX</div>
      </div>
    </div>
  );
};

export default ControlsPanel;
