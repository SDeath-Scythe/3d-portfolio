// src/components/ShieldEffect.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShieldEffect = ({ 
  position = [0, 0, 0], 
  scale = [1, 1, 1], 
  visible = true, 
  color = "#00ff88",
  intensity = 0.8,
  animated = true
}) => {
  const shieldRef = useRef();
  const innerShieldRef = useRef();
  
  // Create hexagonal pattern shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        opacity: { value: 0.3 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        uniform float opacity;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Hexagonal pattern function
        float hexagon(vec2 uv, float size) {
          uv = abs(uv);
          float c = dot(uv, normalize(vec2(1.0, 1.732)));
          c = max(c, uv.x);
          return smoothstep(size - 0.01, size + 0.01, c);
        }
        
        void main() {
          vec2 uv = vUv * 10.0;
          vec2 id = floor(uv);
          uv = fract(uv) - 0.5;
          
          // Create hexagonal grid
          float hex = hexagon(uv, 0.3);
          
          // Add time-based animation
          float wave = sin(time * 2.0 + length(vPosition) * 0.1) * 0.5 + 0.5;
          
          // Energy flow effect
          float energy = sin(time * 3.0 + id.x * 0.5 + id.y * 0.3) * 0.5 + 0.5;
          
          // Combine effects
          float alpha = (1.0 - hex) * wave * energy * intensity;
          
          gl_FragColor = vec4(color, alpha * opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }, [color, intensity]);
  
  useFrame((state) => {
    if (animated && shieldRef.current) {
      shieldRef.current.material.uniforms.time.value = state.clock.elapsedTime;
      shieldRef.current.rotation.y += 0.01;
      
      // Pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      shieldRef.current.scale.setScalar(pulse);
    }
    
    if (innerShieldRef.current) {
      innerShieldRef.current.rotation.y -= 0.005;
    }
  });
  
  if (!visible) return null;
  
  return (
    <group position={position}>
      {/* Outer shield */}
      <mesh ref={shieldRef} scale={scale}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <primitive object={shaderMaterial} />
      </mesh>
      
      {/* Inner energy field */}
      <mesh ref={innerShieldRef} scale={scale}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial 
          color={color}
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Energy particles */}
      <points>
        <sphereGeometry args={[1.15, 64, 64]} />
        <pointsMaterial 
          color={color}
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation={false}
        />
      </points>
    </group>
  );
};

export default ShieldEffect;
