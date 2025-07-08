// src/components/Starfield.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = ({ count = 5000 }) => {
  const mesh = useRef();
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a large sphere
      const radius = Math.random() * 800 + 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random colors (bluish to white)
      const colorVariation = Math.random();
      colors[i3] = 0.5 + colorVariation * 0.5;     // Red
      colors[i3 + 1] = 0.7 + colorVariation * 0.3; // Green
      colors[i3 + 2] = 0.9 + colorVariation * 0.1; // Blue
      
      // Random scales
      scales[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, colors, scales };
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0002;
      mesh.current.rotation.x += 0.0001;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particleData.positions}
          count={particleData.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particleData.colors}
          count={particleData.colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          array={particleData.scales}
          count={particleData.scales.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Starfield;
