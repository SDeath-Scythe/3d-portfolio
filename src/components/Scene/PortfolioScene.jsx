// src/components/Scene/PortfolioScene.jsx
import React, { useState } from 'react';
import * as THREE from 'three';
import Gun from '../../models/Gun';
import Planet from '../../models/Planet';

const PortfolioScene = ({ hoveredObject }) => {
  return (
    <>
      {/* Gun viewmodel */}
      <Gun />

      {/* Portfolio planets */}
      <Planet
        planetScenePath="/assets/3d/Planet.glb"
        position={[2, 0, -10]}
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, Math.PI / 4, 0]}
        name="Planet_About"
        hoveredObject={hoveredObject}
      />
      
      <Planet
        planetScenePath="/assets/3d/Planet.glb"
        position={[-2, 1, -15]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, -Math.PI / 6, 0]}
        name="Planet_Projects"
        hoveredObject={hoveredObject}
      />
      
      <Planet
        planetScenePath="/assets/3d/Planet.glb"
        position={[0, -2, -20]}
        scale={[1.2, 1.2, 1.2]}
        rotation={[Math.PI / 8, Math.PI / 2, 0]}
        name="Planet_Contact"
        hoveredObject={hoveredObject}
      />

      {/* Space background */}
      <mesh position={[0, 0, 0]} scale={[200, 200, 200]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color="#0a0a0a" 
          side={THREE.BackSide}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

export default PortfolioScene;
