// src/components/UI/AudioControls.jsx
import React from 'react';
import { useAudio } from '../AudioManager';

const AudioControls = () => {
  const { 
    musicEnabled, 
    sfxEnabled, 
    setMusicEnabled, 
    setSfxEnabled,
    startBackgroundMusic 
  } = useAudio();

  const handleMusicToggle = () => {
    if (!musicEnabled) {
      // If turning music on, start it
      startBackgroundMusic();
    }
    setMusicEnabled(!musicEnabled);
  };

  const buttonStyle = (enabled) => ({
    backgroundColor: enabled ? '#00ffff' : '#333',
    color: enabled ? '#000' : '#00ffff',
    border: '2px solid #00ffff',
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '140px'
  });

  const keyStyle = {
    backgroundColor: '#00ffff',
    color: '#000',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: 'bold',
    marginLeft: '8px'
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 1000,
      fontFamily: '"Orbitron", monospace'
    }}>
      <button
        onClick={handleMusicToggle}
        style={buttonStyle(musicEnabled)}
        title="Press 'M' to toggle music"
      >
        <span>🎵 Music: {musicEnabled ? 'ON' : 'OFF'}</span>
        <span style={keyStyle}>M</span>
      </button>
      
      <button
        onClick={() => setSfxEnabled(!sfxEnabled)}
        style={buttonStyle(sfxEnabled)}
        title="Press 'N' to toggle sound effects"
      >
        <span>🔊 SFX: {sfxEnabled ? 'ON' : 'OFF'}</span>
        <span style={keyStyle}>N</span>
      </button>
    </div>
  );
};

export default AudioControls;
