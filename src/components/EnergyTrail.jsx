// src/components/EnergyTrail.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EnergyTrail = ({ 
  points = [],
  width = 0.1,
  color = "#00ff88",
  opacity = 0.8,
  animated = true,
  trailLength = 20
}) => {
  const trailRef = useRef();
  const trailPoints = useRef([]);
  
  // Create trail geometry
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(trailLength * 3);
    const colors = new Float32Array(trailLength * 3);
    
    // Initialize with zeros
    for (let i = 0; i < trailLength; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, [trailLength]);
  
  // Create trail material
  const trailMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      linewidth: width,
      vertexColors: true
    });
  }, [color, opacity, width]);
  
  useFrame((state) => {
    if (!trailRef.current || points.length === 0) return;
    
    // Add current position to trail
    if (points.length > 0) {
      const latestPoint = points[points.length - 1];
      trailPoints.current.push(latestPoint);
      
      // Keep trail length limited
      if (trailPoints.current.length > trailLength) {
        trailPoints.current.shift();
      }
    }
    
    // Update trail geometry
    const positions = trailRef.current.geometry.attributes.position.array;
    const colors = trailRef.current.geometry.attributes.color.array;
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < trailLength; i++) {
      if (i < trailPoints.current.length) {
        const point = trailPoints.current[i];
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
        
        // Fade trail from back to front
        const alpha = i / trailLength;
        colors[i * 3] = colorObj.r * alpha;
        colors[i * 3 + 1] = colorObj.g * alpha;
        colors[i * 3 + 2] = colorObj.b * alpha;
      } else {
        // Empty trail points
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0;
      }
    }
    
    trailRef.current.geometry.attributes.position.needsUpdate = true;
    trailRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Animate trail with energy pulse
    if (animated) {
      const time = state.clock.elapsedTime;
      trailRef.current.material.opacity = (Math.sin(time * 5) * 0.3 + 0.7) * opacity;
    }
  });
  
  return (
    <line ref={trailRef}>
      <primitive object={trailGeometry} />
      <primitive object={trailMaterial} />
    </line>
  );
};

export default EnergyTrail;
