// src/components/UI/AudioControls.jsx
import React from 'react';
import { useAudio } from '../AudioManager';

const AudioControls = () => {
  const { 
    musicEnabled, 
    sfxEnabled, 
    musicVolume, 
    sfxVolume,
    toggleMusic, 
    toggleSFX, 
    setMusicVolume, 
    setSfxVolume 
  } = useAudio();

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '300px', // Move away from mission status
      background: 'rgba(0, 20, 40, 0.95)',
      border: '1px solid rgba(0, 255, 136, 0.6)',
      borderRadius: '8px',
      padding: '15px',
      color: '#00ff88',
      fontFamily: '"Courier New", monospace',
      fontSize: '12px',
      zIndex: 200, // Higher than HUD
      minWidth: '220px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
        🎵 AUDIO CONTROLS
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <button
          onClick={toggleMusic}
          style={{
            background: musicEnabled ? '#00ff88' : 'transparent',
            color: musicEnabled ? '#000' : '#00ff88',
            border: '1px solid #00ff88',
            padding: '4px 8px',
            cursor: 'pointer',
            marginRight: '8px',
            borderRadius: '4px',
            fontSize: '11px'
          }}
        >
          🎵 {musicEnabled ? 'MUSIC ON' : 'MUSIC OFF'}
        </button>
        
        <button
          onClick={toggleSFX}
          style={{
            background: sfxEnabled ? '#00ff88' : 'transparent',
            color: sfxEnabled ? '#000' : '#00ff88',
            border: '1px solid #00ff88',
            padding: '4px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '11px'
          }}
        >
          🔊 {sfxEnabled ? 'SFX ON' : 'SFX OFF'}
        </button>
      </div>
      
      <div style={{ marginBottom: '6px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>
          Music: {Math.round(musicVolume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#00ff88'
          }}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '2px' }}>
          SFX: {Math.round(sfxVolume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={sfxVolume}
          onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#00ff88'
          }}
        />
      </div>
    </div>
  );
};

export default AudioControls;
