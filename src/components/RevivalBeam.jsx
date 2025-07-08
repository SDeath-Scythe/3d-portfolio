// src/components/RevivalBeam.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RevivalBeam = ({ startPosition, endPosition, visible, duration = 500, onComplete }) => {
  const beamRef = useRef();
  const materialRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    if (visible) {
      timeRef.current = 0;
      console.log('RevivalBeam: Starting animation', { startPosition, endPosition });
    }
  }, [visible, startPosition, endPosition]);

  useFrame((state, delta) => {
    if (visible && beamRef.current && materialRef.current && startPosition && endPosition) {
      timeRef.current += delta * 1000;
      
      // Fade out effect with pulsing
      const fadeProgress = Math.min(timeRef.current / duration, 1);
      const pulse = Math.sin(timeRef.current * 0.01) * 0.3 + 0.7;
      const opacity = (1 - fadeProgress) * pulse;
      
      materialRef.current.opacity = Math.max(0, opacity);
      
      // Position and orient the beam
      const start = new THREE.Vector3().copy(startPosition);
      const end = new THREE.Vector3().copy(endPosition);
      const direction = end.clone().sub(start);
      const distance = direction.length();
      
      // Position beam at midpoint
      const midpoint = start.clone().add(direction.clone().multiplyScalar(0.5));
      beamRef.current.position.copy(midpoint);
      
      // Scale and orient beam
      beamRef.current.scale.set(0.12, 0.12, distance);
      beamRef.current.lookAt(end);
      beamRef.current.rotateX(Math.PI / 2);
      
      // Complete the beam when duration is reached
      if (timeRef.current >= duration) {
        onComplete?.();
      }
    }
  });

  if (!visible) return null;

  return (
    <group>
      <mesh ref={beamRef}>
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshBasicMaterial 
          ref={materialRef}
          color="#00ff88"
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

export default RevivalBeam;
