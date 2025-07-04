// src/components/RevivalBeam.jsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RevivalBeam = ({ startPosition, endPosition, visible, onComplete }) => {
  const meshRef = useRef();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (visible) {
      console.log("RevivalBeam: Starting beam with positions:", { startPosition, endPosition }); // Debug log
      setOpacity(1);
      // Auto-complete after 0.5 seconds (longer than laser for visibility)
      const timer = setTimeout(() => {
        console.log("RevivalBeam: Beam completing"); // Debug log
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete, startPosition, endPosition]);

  // Create material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#00ff88",
      emissive: "#00dd44",
      transparent: true,
      opacity: 1,
      roughness: 0.0,
      metalness: 0.3,
      toneMapped: false
    });
  }, []);

  useFrame(({ clock }) => {
    if (!visible || !material) return;

    // Pulsing effect
    const pulse = 0.8 + 0.2 * Math.sin(clock.getElapsedTime() * 10);
    const newOpacity = Math.max(0, opacity - 0.04); // Slower fade
    setOpacity(newOpacity);
    material.opacity = newOpacity * pulse;
    material.needsUpdate = true;
  });

  // Cleanup material when component unmounts
  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  if (!visible || !startPosition || !endPosition) {
    console.log("RevivalBeam: Not rendering", { visible, startPosition, endPosition });
    return null;
  }

  // Calculate laser beam geometry (same as LaserBeam)
  const start = new THREE.Vector3().copy(startPosition);
  const end = new THREE.Vector3().copy(endPosition);
  const direction = new THREE.Vector3().subVectors(end, start);
  const distance = direction.length();
  
  // Calculate midpoint and rotation
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  console.log("RevivalBeam: Rendering beam", { midpoint, distance, quaternion });

  return (
    <mesh 
      ref={meshRef}
      position={midpoint}
      quaternion={quaternion}
      material={material}
    >
      <cylinderGeometry args={[0.08, 0.08, distance, 8]} />
    </mesh>
  );
};

export default RevivalBeam;
