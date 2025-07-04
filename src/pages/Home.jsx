// src/pages/Home.jsx
import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';

import Loader from '../components/Loader';
import ErrorBoundary from '../components/ErrorBoundary';
import GameManager from '../components/GameManager';
import AudioProvider from '../components/AudioManager';
import Crosshair from '../components/UI/Crosshair';
import ControlsPanel from '../components/UI/ControlsPanel';
import AudioControls from '../components/UI/AudioControls';
import InfoCard from '../components/UI/InfoCard';
import Credits from '../components/UI/Credits';

const Home = () => {
  // InfoCard state
  const [infoCard, setInfoCard] = useState({
    visible: false,
    planetName: null
  });

  // Track if we should show the re-enter combat message
  const [showCombatMessage, setShowCombatMessage] = useState(false);

  // Handle planet hit from GameManager
  const handlePlanetHit = useCallback((planetName) => {
    setInfoCard({
      visible: true,
      planetName: planetName
    });
    setShowCombatMessage(false); // Hide combat message when card shows
  }, []);

  // Handle info card state change
  const handleInfoCardStateChange = useCallback((isOpen) => {
    // This can be used for additional logic if needed
  }, []);

  // Handle info card close
  const handleInfoCardClose = useCallback(() => {
    setInfoCard({ visible: false, planetName: null });
    setShowCombatMessage(true); // Show combat re-entry message
    
    // Hide the message after 1 second (faster)
    setTimeout(() => {
      setShowCombatMessage(false);
    }, 1000);
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
              />
            </Suspense>
          </Canvas>
          
          <Crosshair />
          <ControlsPanel />
          <AudioControls />
          <Credits />
          
          {/* Combat mode re-entry message */}
          {showCombatMessage && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#00ffff',
              fontFamily: 'Courier New, monospace',
              fontSize: '18px',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              pointerEvents: 'none',
              zIndex: 500,
              animation: 'pulse 1.5s ease-in-out infinite',
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '15px 25px',
              borderRadius: '10px',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}>
              CLICK TO RE-ENTER COMBAT MODE
            </div>
          )}
          
          {/* Info Card - rendered outside of Canvas */}
          <InfoCard
            planetName={infoCard.planetName}
            isVisible={infoCard.visible}
            onClose={handleInfoCardClose}
          />
        </section>
      </ErrorBoundary>
    </AudioProvider>
  );
};

export default Home;