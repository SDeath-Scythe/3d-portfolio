// src/components/AudioManager.jsx
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.7);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Audio refs
  const backgroundMusicRef = useRef(null);
  const laserSoundRef = useRef(null);
  const hitSoundRef = useRef(null);

  // Initialize audio and keyboard listeners
  useEffect(() => {
    // Background music - using your space-music.mp3
    backgroundMusicRef.current = new Audio('/assets/audio/space-music.mp3');
    backgroundMusicRef.current.loop = true; // Enable looping
    backgroundMusicRef.current.volume = musicVolume;
    backgroundMusicRef.current.preload = 'auto'; // Preload the audio

    // Sound effects - using your actual file names
    laserSoundRef.current = new Audio('/assets/audio/laser.mp3');
    laserSoundRef.current.volume = sfxVolume;
    laserSoundRef.current.preload = 'auto';

    hitSoundRef.current = new Audio('/assets/audio/destructuon.mp3');
    hitSoundRef.current.volume = sfxVolume;
    hitSoundRef.current.preload = 'auto';

    // Keyboard event listener
    const handleKeyPress = (event) => {
      // Mark user interaction
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
      
      // Check if user is typing in an input field
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'm':
          setMusicEnabled(prev => !prev);
          break;
        case 'n':
          setSfxEnabled(prev => !prev);
          break;
        default:
          break;
      }
    };

    // Mouse click detection for user interaction
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);

    return () => {
      // Cleanup
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [musicVolume, sfxVolume]);

  // Start background music (only after user interaction)
  const startBackgroundMusic = () => {
    if (musicEnabled && backgroundMusicRef.current && hasUserInteracted) {
      backgroundMusicRef.current.play().catch(err => {
        console.log('Background music play failed - user interaction required:', err.message);
      });
    }
  };

  // Ensure music loops continuously
  useEffect(() => {
    const music = backgroundMusicRef.current;
    
    const handleMusicEnd = () => {
      // This shouldn't happen with loop=true, but just in case
      if (musicEnabled && music) {
        music.currentTime = 0;
        music.play().catch(err => {
          console.log('Music restart failed:', err);
        });
      }
    };

    if (music) {
      music.addEventListener('ended', handleMusicEnd);
      return () => {
        music.removeEventListener('ended', handleMusicEnd);
      };
    }
  }, [musicEnabled]);

  // Start music automatically when user interacts
  useEffect(() => {
    if (hasUserInteracted && musicEnabled) {
      startBackgroundMusic();
    }
  }, [hasUserInteracted, musicEnabled]);

  // Update music volume and enabled state
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = musicEnabled ? musicVolume : 0;
      if (musicEnabled) {
        backgroundMusicRef.current.play().catch(() => {});
      } else {
        backgroundMusicRef.current.pause();
      }
    }
  }, [musicEnabled, musicVolume]);

  // Update SFX volume
  useEffect(() => {
    const volume = sfxEnabled ? sfxVolume : 0;
    if (laserSoundRef.current) laserSoundRef.current.volume = volume;
    if (hitSoundRef.current) hitSoundRef.current.volume = volume;
  }, [sfxEnabled, sfxVolume]);

  // Play sound effects
  const playLaserSound = () => {
    if (sfxEnabled && laserSoundRef.current) {
      laserSoundRef.current.currentTime = 0; // Reset to start
      laserSoundRef.current.play().catch(err => {
        console.log('Laser sound play failed:', err);
      });
    }
  };

  const playHitSound = () => {
    if (sfxEnabled && hitSoundRef.current) {
      hitSoundRef.current.currentTime = 0; // Reset to start
      hitSoundRef.current.play().catch(err => {
        console.log('Hit sound play failed:', err);
      });
    }
  };

  const value = {
    musicEnabled,
    sfxEnabled,
    setMusicEnabled,
    setSfxEnabled,
    musicVolume,
    sfxVolume,
    setMusicVolume,
    setSfxVolume,
    startBackgroundMusic,
    playLaserSound,
    playHitSound
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
