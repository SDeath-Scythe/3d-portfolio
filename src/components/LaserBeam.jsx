// src/components/LaserBeam.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaserBeam = ({ startPosition, endPosition, visible, duration = 150, onComplete }) => {
  const beamRef = useRef();
  const materialRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    if (visible) {
      timeRef.current = 0;
    }
  }, [visible]);

  useFrame((state, delta) => {
    if (visible && beamRef.current && materialRef.current && startPosition && endPosition) {
      timeRef.current += delta * 1000;
      
      // Fade out effect
      const fadeProgress = Math.min(timeRef.current / duration, 1);
      const opacity = 1 - fadeProgress;
      
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
      beamRef.current.scale.set(0.1, 0.1, distance);
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
          color="#ff4444"
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

export default LaserBeam;
