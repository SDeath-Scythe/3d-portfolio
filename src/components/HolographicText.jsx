// src/components/HolographicText.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const HolographicText = ({ 
  text = "WELCOME TO THE PORTFOLIO", 
  position = [0, 8, -20],
  fontSize = 2,
  visible = true 
}) => {
  const groupRef = useRef();
  const textRef = useRef();
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0.8,
    emissive: '#00ffff',
    emissiveIntensity: 0.2,
  }), []);
  
  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      
      if (textRef.current) {
        textRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });
  
  if (!visible) return null;
  
  return (
    <group ref={groupRef} position={position}>
      <Text
        ref={textRef}
        text={text}
        fontSize={fontSize}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        material={material}
      >
        {/* Holographic glow effect */}
        <meshStandardMaterial 
          color="#00ffff"
          transparent={true}
          opacity={0.8}
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </Text>
      
      {/* Scanning line effect */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[text.length * fontSize * 0.5, fontSize * 1.2]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent={true}
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default HolographicText;
