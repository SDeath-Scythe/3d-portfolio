// src/pages/Home.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import Loader from '../components/Loader';
import GameManager from '../components/GameManager';
import Crosshair from '../components/UI/Crosshair';
import ControlsPanel from '../components/UI/ControlsPanel';

const Home = () => {
  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 0] }}
      >
        <Suspense fallback={<Loader />}>
          <GameManager />
        </Suspense>
      </Canvas>
      
      <Crosshair />
      <ControlsPanel />
    </section>
  );
};

export default Home;