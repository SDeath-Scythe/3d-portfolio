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
    setShowCombatMessage(true);
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
          />
        </section>
      </ErrorBoundary>
    </AudioProvider>
  );
};

export default Home;