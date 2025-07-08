// src/pages/Home.jsx
import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';

import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';
import GameManager from '../components/GameManager';
import { AudioProvider } from '../components/AudioManager';
import Crosshair from '../components/UI/Crosshair';
import ControlsPanel from '../components/UI/ControlsPanel';
import AudioControls from '../components/UI/AudioControls';
import InfoCard from '../components/UI/InfoCard';
import Credits from '../components/UI/Credits';
import EnhancedHUD from '../components/UI/EnhancedHUD';
import NotificationSystem from '../components/UI/NotificationSystem';
import InstructionOverlay from '../components/UI/InstructionOverlay';

const Home = () => {
  // InfoCard state
  const [infoCard, setInfoCard] = useState({
    visible: false,
    planetName: null
  });

  // Track if we should show the re-enter combat message
  const [showCombatMessage, setShowCombatMessage] = useState(false);
  
  // Enhanced HUD state
  const [hudState, setHudState] = useState({
    health: 100,
    energy: 100,
    score: 0,
    planetHits: 0,
    isPointerLocked: false
  });
  
  // Notification system state
  const [notifications, setNotifications] = useState([]);

  // Store reference to game manager functions
  const [gameManagerRef, setGameManagerRef] = useState(null);

  // Add notification helper
  const addNotification = useCallback((type, title, message) => {
    setNotifications(prev => [...prev, { type, title, message }]);
  }, []);

  // Handle combat mode request (for InfoCard close)
  const handleRequestCombatMode = useCallback(() => {
    if (gameManagerRef && gameManagerRef.requestPointerLock) {
      gameManagerRef.requestPointerLock();
      addNotification(
        'success',
        '🎯 COMBAT MODE ACTIVATED',
        'Systems online! Target acquisition enabled. Weapons hot!'
      );
    }
  }, [gameManagerRef, addNotification]);

  // Handle planet hit from GameManager
  const handlePlanetHit = useCallback((planetName) => {
    setInfoCard({
      visible: true,
      planetName: planetName
    });
    setShowCombatMessage(true);
    
    // Update HUD state
    setHudState(prev => ({
      ...prev,
      planetHits: prev.planetHits + 1,
      score: prev.score + 1000,
      energy: Math.max(prev.energy - 10, 0)
    }));
    
    // Add success notification
    addNotification(
      'success',
      'TARGET ACQUIRED',
      `Successfully engaged ${planetName.replace('Planet_', '')} target!`
    );
  }, []);

  // Handle closing info card
  const handleCloseInfoCard = useCallback(() => {
    setInfoCard({
      visible: false,
      planetName: null
    });
  }, []);

  return (
    <AudioProvider>
      <ErrorBoundary>
        <section style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Canvas
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 0] }}
            gl={{ 
              antialias: true, 
              powerPreference: "high-performance",
              alpha: false,
              stencil: false,
              depth: true
            }}
            dpr={[1, 2]} // Adaptive pixel ratio
          >
            <Suspense fallback={<Loader />}>
              <GameManager 
                onPlanetHit={handlePlanetHit}
                onGameManagerReady={setGameManagerRef}
              />
            </Suspense>
          </Canvas>
          
          <Crosshair />
          <ControlsPanel />
          <AudioControls />
          {/* Only show instruction overlay initially, hide after first interaction */}
          <InstructionOverlay visible={!infoCard.visible && hudState.planetHits === 0} />
          <EnhancedHUD 
            health={hudState.health}
            energy={hudState.energy}
            score={hudState.score}
            planetHits={hudState.planetHits}
            isPointerLocked={hudState.isPointerLocked}
          />
          <Credits />
          
          {/* Notification System */}
          <NotificationSystem notifications={notifications} />
          
          {/* Combat mode re-entry message */}
          {showCombatMessage && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#00ff00',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #00ff00',
              fontFamily: 'monospace',
              fontSize: '14px',
              zIndex: 1000,
              animation: 'fadeInOut 3s ease-in-out forwards'
            }}>
              🎯 Combat Mode Active - Use Right Click to Revive
            </div>
          )}
          
          {/* InfoCard */}
          <InfoCard 
            visible={infoCard.visible}
            planetName={infoCard.planetName}
            onClose={handleCloseInfoCard}
            onRequestCombatMode={handleRequestCombatMode}
          />
        </section>
      </ErrorBoundary>
    </AudioProvider>
  );
};

export default Home;