// src/components/FloatingGeometry.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingGeometry = ({ count = 20, spread = 100 }) => {
  const groupRef = useRef();
  
  // Create random floating geometric shapes
  const shapes = useMemo(() => {
    const shapes = [];
    
    for (let i = 0; i < count; i++) {
      const shapeType = Math.floor(Math.random() * 4);
      const position = [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      ];
      const rotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ];
      const scale = Math.random() * 0.5 + 0.2;
      const color = [
        '#00ff88',
        '#00ddff',
        '#ff4444',
        '#ffff00',
        '#ff8800'
      ][Math.floor(Math.random() * 5)];
      
      shapes.push({
        id: i,
        type: shapeType,
        position,
        rotation,
        scale,
        color,
        rotationSpeed: [(Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02],
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2
      });
    }
    
    return shapes;
  }, [count, spread]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const shape = shapes[index];
        if (shape) {
          // Floating animation
          child.position.y += Math.sin(state.clock.elapsedTime * shape.floatSpeed + shape.floatOffset) * 0.001;
          
          // Rotation animation
          child.rotation.x += shape.rotationSpeed[0];
          child.rotation.y += shape.rotationSpeed[1];
          child.rotation.z += shape.rotationSpeed[2];
          
          // Pulsing glow
          const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3 + 0.7;
          child.material.opacity = pulse * 0.6;
        }
      });
    }
  });
  
  const getGeometry = (type) => {
    switch(type) {
      case 0: return <boxGeometry args={[1, 1, 1]} />;
      case 1: return <octahedronGeometry args={[1, 0]} />;
      case 2: return <tetrahedronGeometry args={[1, 0]} />;
      case 3: return <icosahedronGeometry args={[1, 0]} />;
      default: return <boxGeometry args={[1, 1, 1]} />;
    }
  };
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh
          key={shape.id}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          {getGeometry(shape.type)}
          <meshBasicMaterial
            color={shape.color}
            transparent
            opacity={0.6}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingGeometry;
