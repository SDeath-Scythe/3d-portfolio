// src/components/LaserBeam.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaserBeam = ({ startPosition, endPosition, visible, duration = 150, onComplete }) => {
  const beamRef = useRef();
  const innerBeamRef = useRef();
  const outerBeamRef = useRef();
  const sparkRef = useRef();
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
      
      // Enhanced fade out effect with pulsing
      const fadeProgress = Math.min(timeRef.current / duration, 1);
      const pulse = Math.sin(state.clock.elapsedTime * 10) * 0.2 + 0.8;
      const opacity = (1 - fadeProgress) * pulse;
      
      materialRef.current.opacity = Math.max(0, opacity);
      
      // Position and orient the beam
      const start = new THREE.Vector3().copy(startPosition);
      const end = new THREE.Vector3().copy(endPosition);
      const direction = end.clone().sub(start);
      const distance = direction.length();
      
      // Position beam at midpoint
      const midpoint = start.clone().add(direction.clone().multiplyScalar(0.5));
      
      // Apply transformations to all beam parts
      [beamRef.current, innerBeamRef.current, outerBeamRef.current].forEach(ref => {
        if (ref) {
          ref.position.copy(midpoint);
          ref.scale.set(0.2, 0.2, distance); // Made slightly thicker for better visibility
          ref.lookAt(end);
          ref.rotateX(Math.PI / 2);
        }
      });
      
      // Animate spark at impact point with more dynamic effects
      if (sparkRef.current) {
        const sparkScale = Math.sin(state.clock.elapsedTime * 20) * 0.7 + 1.3;
        sparkRef.current.scale.setScalar(sparkScale);
        sparkRef.current.rotation.y += 0.15;
        sparkRef.current.rotation.x += 0.1;
      }
      
      // Complete the beam when duration is reached
      if (timeRef.current >= duration) {
        onComplete?.();
      }
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* Core laser beam with electric energy */}
      <mesh ref={beamRef}>
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <meshBasicMaterial 
          ref={materialRef}
          color="#ff0044"
          transparent={true}
          opacity={1}
        />
      </mesh>
      
      {/* Inner plasma glow */}
      <mesh ref={innerBeamRef}>
        <cylinderGeometry args={[0.7, 0.7, 1, 8]} />
        <meshBasicMaterial 
          color="#ff4488"
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Outer energy field with additive blending */}
      <mesh ref={outerBeamRef}>
        <cylinderGeometry args={[1.5, 1.5, 1, 8]} />
        <meshBasicMaterial 
          color="#ff0022"
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Dynamic impact spark with rotating geometry */}
      {visible && endPosition && (
        <group position={endPosition}>
          <mesh ref={sparkRef}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshBasicMaterial 
              color="#ffff00"
              transparent={true}
              opacity={0.9}
            />
          </mesh>
          
          {/* Spark particles */}
          <points>
            <sphereGeometry args={[0.8, 32, 32]} />
            <pointsMaterial 
              color="#ff8800"
              size={0.05}
              transparent
              opacity={0.7}
              sizeAttenuation={false}
            />
          </points>
          
          {/* Impact flash */}
          <mesh>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial 
              color="#ffffff"
              transparent={true}
              opacity={0.6}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default LaserBeam;
