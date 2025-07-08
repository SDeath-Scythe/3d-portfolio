// src/components/Scene/PortfolioScene.jsx
import React, { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Gun from '../../models/Gun';
import Planet from '../../models/Planet';
import { ASSET_PATHS } from '../../config/assetPaths';
import ParticleSystem from '../ParticleSystem';
import ShieldEffect from '../ShieldEffect';
import FloatingGeometry from '../FloatingGeometry';
import EnergyTrail from '../EnergyTrail';
import Starfield from '../Starfield';
import HolographicText from '../HolographicText';
import TargetingSystem from '../TargetingSystem';

// Separate components for GLB models to avoid hooks being called in render

const PropShip = ({ position, rotation, scale, color = "#ffffff" }) => {
  const { scene } = useGLTF(ASSET_PATHS.PROP_SHIP);
  const shipRef = useRef();
  
  useEffect(() => {
    if (shipRef.current) {
      // Apply color to all meshes in the ship
      shipRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.material.clone) {
            child.material = child.material.clone();
            child.material.color.set(color);
          }
        }
      });
    }
  }, [color]);
  
  return (
    <group ref={shipRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
};

// Custom space skybox for enhanced atmosphere
const SpaceSkybox = () => {
  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <meshBasicMaterial 
        color="#001122" 
        side={THREE.BackSide} 
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
};

// Particle stars for enhanced space atmosphere
const SpaceStars = () => {
  const starsRef = useRef();
  const starCount = 1000;
  
  const starPositions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);
  
  const starColors = useMemo(() => {
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      // Create varied star colors (white, blue, yellow, red)
      const colorType = Math.random();
      if (colorType < 0.6) {
        // White stars (most common)
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorType < 0.8) {
        // Blue stars
        colors[i * 3] = 0.7;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else if (colorType < 0.95) {
        // Yellow stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.7;
      } else {
        // Red stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 0.7;
      }
    }
    return colors;
  }, []);
  
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.0001;
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          count={starCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={starColors}
          count={starCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={2} 
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Fallback component for loading errors or high-poly models
const PlanetFallback = ({ position, scale, name, hoveredObject, isDestroyed }) => {
  const meshRef = useRef();
  
  // Different colors for each planet
  const getColorScheme = (planetName) => {
    switch(planetName) {
      case 'Planet_About':
        return { 
          normal: "#ff4444", 
          destroyed: "#ff6622", // Brighter orange-red
          emissive: isDestroyed ? "#aa2200" : "#440000" 
        };
      case 'Planet_Projects':
        return { 
          normal: "#4444ff", 
          destroyed: "#6644ff", // Brighter purple-blue
          emissive: isDestroyed ? "#2200aa" : "#000044" 
        };
      case 'Planet_Skills':
        return { 
          normal: "#44ff44", 
          destroyed: "#66ff22", // Brighter lime-green
          emissive: isDestroyed ? "#22aa00" : "#004400" 
        };
      default:
        return { 
          normal: "#ffffff", 
          destroyed: "#aaaaaa", // Brighter gray
          emissive: isDestroyed ? "#555555" : "#444444" 
        };
    }
  };
  
  const colors = getColorScheme(name);
  
  useEffect(() => {
    if (meshRef.current) {
      // Set userData for raycasting compatibility
      meshRef.current.userData.isTargetable = !isDestroyed;
      meshRef.current.userData.name = name;
      meshRef.current.userData.isDestroyed = isDestroyed;
    }
  }, [name, isDestroyed]);
  
  return (
    <mesh 
      ref={meshRef}
      position={position} 
      scale={scale}
      userData={{ isTargetable: !isDestroyed, name, isDestroyed }}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color={isDestroyed ? colors.destroyed : colors.normal} 
        emissive={colors.emissive}
        roughness={isDestroyed ? 0.9 : 0.3}
      />
    </mesh>
  );
};

const PortfolioScene = ({ hoveredObject, destroyedPlanets = [] }) => {
  // Suppress non-critical GLTF extension warnings
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.warn = (...args) => {
      const message = args.join(' ').toString();
      if (message.includes('KHR_materials_pbrSpecularGlossiness') ||
          message.includes('GLTFLoader') ||
          message.includes('Unknown extension') ||
          message.includes('extension is not supported')) {
        return; // Suppress these specific warnings
      }
      originalWarn.apply(console, args);
    };
    
    console.error = (...args) => {
      const message = args.join(' ').toString();
      if (message.includes('KHR_materials_pbrSpecularGlossiness') ||
          message.includes('GLTFLoader') ||
          message.includes('Unknown extension') ||
          message.includes('extension is not supported')) {
        return; // Suppress these specific errors too
      }
      originalError.apply(console, args);
    };
    
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return (
    <>
      {/* Gun viewmodel */}
      <Gun />

      {/* Three unique planet models - properly spaced and sized */}
      
      {/* Three unique planet models - properly spaced and sized */}
      
      {/* Planet 1 - Front - Planet.glb */}
      <Planet
        planetScenePath={ASSET_PATHS.PLANET_1}
        position={[2, 5, -55]}
        scale={[7.2, 7.2, 7.2]}
        rotation={[0, 0, 0]}
        name="Planet_About"
        hoveredObject={hoveredObject}
        isDestroyed={destroyedPlanets.includes('Planet_About')}
      />
      <TargetingSystem 
        planetName="Planet_About"
        position={[2, 5, -55]}
        isDestroyed={destroyedPlanets.includes('Planet_About')}
        visible={true}
        hoveredObject={hoveredObject}
      />
      
      {/* Planet 2 - Right - planet-2.glb */}
      <Planet
        planetScenePath={ASSET_PATHS.PLANET_2}
        position={[55, 6, 10]}
        scale={[0.9, 0.9, 0.9]}
        rotation={[0, -Math.PI / 3, 0]}
        name="Planet_Projects"
        hoveredObject={hoveredObject}
        isDestroyed={destroyedPlanets.includes('Planet_Projects')}
      />
      <TargetingSystem 
        planetName="Planet_Projects"
        position={[55, 6, 10]}
        isDestroyed={destroyedPlanets.includes('Planet_Projects')}
        visible={true}
        hoveredObject={hoveredObject}
      />
      
      {/* Planet 3 - Left - planet-3.glb */}
      <Planet
        planetScenePath={ASSET_PATHS.PLANET_3}
        position={[-60, 8, 10]}
        scale={[6.2, 6.2, 6.2]}
        rotation={[0, Math.PI / 3, 0]}
        name="Planet_Skills"
        hoveredObject={hoveredObject}
        isDestroyed={destroyedPlanets.includes('Planet_Skills')}
      />
      <TargetingSystem 
        planetName="Planet_Skills"
        position={[-60, 8, 10]}
        isDestroyed={destroyedPlanets.includes('Planet_Skills')}
        visible={true}
        hoveredObject={hoveredObject}
      />

      {/* Enhanced space atmosphere */}
      
      {/* Enhanced lighting for space environment */}
      <ambientLight intensity={0.3} color="#4455ff" />
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={1.2} 
        color="#6677ff" 
        distance={100}
      />
      
      {/* Custom space skybox */}
      <SpaceSkybox />
      
      {/* Particle stars */}
      <SpaceStars />
      
      {/* Floating geometric decorations */}
      <FloatingGeometry count={30} spread={150} />
      
      {/* Particle systems around planets */}
      <ParticleSystem 
        position={[2, 5, -55]} 
        particleCount={50}
        color="#ff4444"
        spread={10}
        visible={!destroyedPlanets.includes('Planet_About')}
      />
      
      <ParticleSystem 
        position={[55, 6, 10]} 
        particleCount={50}
        color="#4444ff"
        spread={8}
        visible={!destroyedPlanets.includes('Planet_Projects')}
      />
      
      <ParticleSystem 
        position={[-60, 8, 10]} 
        particleCount={50}
        color="#44ff44"
        spread={12}
        visible={!destroyedPlanets.includes('Planet_Skills')}
      />
      
      {/* Shield effects for non-destroyed planets */}
      <ShieldEffect 
        position={[2, 5, -55]} 
        scale={[8, 8, 8]}
        color="#ff4444"
        visible={!destroyedPlanets.includes('Planet_About')}
      />
      
      <ShieldEffect 
        position={[55, 6, 10]} 
        scale={[1.2, 1.2, 1.2]}
        color="#4444ff"
        visible={!destroyedPlanets.includes('Planet_Projects')}
      />
      
      <ShieldEffect 
        position={[-60, 8, 10]} 
        scale={[7, 7, 7]}
        color="#44ff44"
        visible={!destroyedPlanets.includes('Planet_Skills')}
      />

      {/* Background Starfield */}
      <Starfield count={3000} />

      {/* Holographic Welcome Text */}
      <HolographicText 
        text="PORTFOLIO DEFENSE SYSTEM"
        position={[0, 25, -50]}
        fontSize={1.8}
        visible={true}
      />

      {/* Prop ships scattered around - only two ships with different colors, far away */}
      
      {/* Ship 1 - Far right - Blue/Cyan */}
      <Suspense fallback={null}>
        <PropShip 
          position={[200, 50, -120]} 
          rotation={[0.1, Math.PI * 0.4, 0]} 
          scale={[4, 4, 4]}
          color="#00aaff"
        />
      </Suspense>

      {/* Ship 2 - Far left - Red/Orange */}
      <Suspense fallback={null}>
        <PropShip 
          position={[-180, -30, 100]} 
          rotation={[0, Math.PI * 0.9, 0.15]} 
          scale={[3.5, 3.5, 3.5]}
          color="#ff4400"
        />
      </Suspense>
    </>
  );
};

// Preload models for better performance
useGLTF.preload(ASSET_PATHS.PROP_SHIP);

export default PortfolioScene;
