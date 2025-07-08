// src/components/TargetingSystem.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const TargetingSystem = ({ 
  planetName, 
  position, 
  isDestroyed, 
  distance = 0,
  visible = true,
  hoveredObject 
}) => {
  const groupRef = useRef();
  
  // Always show labels for better visibility
  const isHovered = hoveredObject?.userData?.name === planetName;
  
  useFrame(({ clock, camera }) => {
    if (groupRef.current && !isDestroyed) {
      // Float up and down
      const time = clock.getElapsedTime();
      groupRef.current.position.y = position[1] + 8 + Math.sin(time * 2) * 0.5;
      
      // Always face the camera
      groupRef.current.lookAt(camera.position);
    }
  });

  if (!visible || isDestroyed) return null;

  const getTargetInfo = () => {
    switch (planetName) {
      case 'Planet_About':
        return { title: 'ABOUT ME', color: '#00ffff' };
      case 'Planet_Projects':
        return { title: 'MY PROJECTS', color: '#00ffff' };
      case 'Planet_Skills':
        return { title: 'MY SKILLS', color: '#00ffff' };
      default:
        return { title: 'EXPLORE', color: '#00ffff' };
    }
  };

  const { title, color } = getTargetInfo();

  return (
    <group ref={groupRef} position={position}>
      <Html
        center
        distanceFactor={20}
        transform
        sprite
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          border: `3px solid ${color}`,
          borderRadius: '12px',
          padding: '12px 18px',
          color: color,
          fontFamily: 'Orbitron, monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: `0 0 25px ${color}`,
          backdropFilter: 'blur(8px)',
          minWidth: '160px',
          transform: 'scale(1.2)',
        }}>
          <div style={{ 
            fontSize: '20px', 
            textShadow: `0 0 12px ${color}`,
            marginBottom: '6px',
            letterSpacing: '1px',
          }}>
            🎯 {title}
          </div>
          <div style={{ 
            fontSize: '14px', 
            opacity: 0.95,
            color: '#ffffff',
            textShadow: '0 0 8px rgba(255,255,255,0.8)',
          }}>
            ⚡ SHOOT TO EXPLORE ⚡
          </div>
        </div>
      </Html>
    </group>
  );
};

export default TargetingSystem;
