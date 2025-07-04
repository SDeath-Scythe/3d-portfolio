// src/components/LaserBeam.jsx
import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaserBeam = ({ startPosition, endPosition, visible, onComplete }) => {
  const meshRef = useRef();
  const timeRef = useRef(0);
  const duration = 0.3;

  // Create material once and reuse it
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00ffff",
    transparent: true,
    opacity: 1,
    emissive: "#00ffff",
    emissiveIntensity: 2.0
  }), []);

  useEffect(() => {
    if (visible) {
      timeRef.current = 0;
    }
  }, [visible]);

  useFrame((state, delta) => {
    if (!visible || !material) return;

    timeRef.current += delta;

    // Calculate opacity (fade out over time)
    const opacity = Math.max(0, 1 - (timeRef.current / duration));
    material.opacity = opacity;
    material.needsUpdate = true;

    // Complete the laser effect
    if (timeRef.current >= duration) {
      onComplete?.();
    }
  });

  // Cleanup material when component unmounts
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  if (!visible || !startPosition || !endPosition) return null;

  // Calculate laser beam geometry
  const start = new THREE.Vector3().copy(startPosition);
  const end = new THREE.Vector3().copy(endPosition);
  const direction = new THREE.Vector3().subVectors(end, start);
  const distance = direction.length();
  
  // Calculate midpoint and rotation
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return (
    <mesh 
      ref={meshRef}
      position={midpoint}
      quaternion={quaternion}
      material={material}
    >
      <cylinderGeometry args={[0.15, 0.15, distance, 8]} />
    </mesh>
  );
};

export default LaserBeam;
