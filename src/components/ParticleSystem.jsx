// src/components/ParticleSystem.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = ({ 
  position = [0, 0, 0], 
  particleCount = 100,
  color = "#00ff88",
  spread = 5,
  speed = 2,
  visible = true
}) => {
  const particlesRef = useRef();
  const velocitiesRef = useRef([]);
  const agesRef = useRef([]);
  
  // Create particle positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];
    const ages = [];
    
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions around the origin
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      
      // Random colors with variations
      colors[i * 3] = colorObj.r + (Math.random() - 0.5) * 0.3;
      colors[i * 3 + 1] = colorObj.g + (Math.random() - 0.5) * 0.3;
      colors[i * 3 + 2] = colorObj.b + (Math.random() - 0.5) * 0.3;
      
      // Random velocities
      velocities.push(
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed,
        (Math.random() - 0.5) * speed
      );
      
      // Random ages for staggered animation
      ages.push(Math.random() * 100);
    }
    
    velocitiesRef.current = velocities;
    agesRef.current = ages;
    
    return { positions, colors };
  }, [particleCount, color, spread, speed]);
  
  useFrame((state, delta) => {
    if (!visible || !particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    const colors = particlesRef.current.geometry.attributes.color.array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update age
      agesRef.current[i] += delta * 30;
      
      // Update positions
      positions[i3] += velocitiesRef.current[i3] * delta;
      positions[i3 + 1] += velocitiesRef.current[i3 + 1] * delta;
      positions[i3 + 2] += velocitiesRef.current[i3 + 2] * delta;
      
      // Fade out based on age
      const age = agesRef.current[i];
      const alpha = Math.max(0, 1 - age / 100);
      
      // Reset particle if too old
      if (age > 100) {
        positions[i3] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * spread;
        agesRef.current[i] = 0;
      }
      
      // Update color alpha
      colors[i3] *= alpha;
      colors[i3 + 1] *= alpha;
      colors[i3 + 2] *= alpha;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  if (!visible) return null;
  
  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={false}
      />
    </points>
  );
};

export default ParticleSystem;
