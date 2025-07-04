// src/models/Planet.jsx
import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Planet = ({ 
  planetScenePath, 
  position, 
  scale, 
  rotation, 
  name, 
  hoveredObject,
  isDestroyed = false 
}) => {
  const planetRef = useRef();
  const originalMaterialsRef = useRef(new Map()); // Store original materials
  
  // Load the planet model
  const { scene: normalScene } = useGLTF(planetScenePath);
  
  // Clone and optimize scene
  const currentScene = useMemo(() => {
    const clonedScene = normalScene.clone();
    
    // Store original materials and optimize scene for performance
    clonedScene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Store original material for revival
        if (child.material && !originalMaterialsRef.current.has(child.uuid)) {
          originalMaterialsRef.current.set(child.uuid, child.material.clone());
        }
        
        // Enable frustum culling for better performance
        child.frustumCulled = true;
        
        // Set material properties for better performance
        if (child.material) {
          child.material.needsUpdate = false;
        }
      }
    });
    
    return clonedScene;
  }, [normalScene]);

  // Apply destroyed state materials
  useEffect(() => {
    if (!currentScene) return;
    
    // Set userData for raycasting on ALL objects in the scene hierarchy
    const setUserDataRecursively = (object) => {
      object.userData.isTargetable = true;
      object.userData.name = name;
      object.userData.isDestroyed = isDestroyed;
      
      // Apply to all children
      object.children.forEach(setUserDataRecursively);
    };
    
    currentScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Set userData for raycasting - always allow interaction for cards and revival
        child.userData.isTargetable = true; // Always targetable for cards
        child.userData.name = name;
        child.userData.isDestroyed = isDestroyed;
        
        if (child.material) {
          if (isDestroyed) {
            // Apply destroyed material appearance
            if (!child.material.userData?.isDestroyedMaterial) {
              child.material = child.material.clone();
              child.material.userData.isDestroyedMaterial = true;
            }
            
            // Apply brighter destroyed appearance
            if (child.material.color) {
              child.material.color.setRGB(1.2, 0.4, 0.1); // Bright orange-red
            }
            
            if (child.material.emissive) {
              child.material.emissive.setRGB(0.6, 0.3, 0.1); // Strong glowing effect
            }
            
            if (child.material.roughness !== undefined) {
              child.material.roughness = 0.4; // Less rough for more glow
            }
            
            if (child.material.metalness !== undefined) {
              child.material.metalness = 0.1;
            }
            
            child.material.needsUpdate = true;
          } else {
            // Restore original material when revived
            const originalMaterial = originalMaterialsRef.current.get(child.uuid);
            if (originalMaterial) {
              child.material = originalMaterial.clone();
              child.material.needsUpdate = true;
            }
          }
        }
      }
    });

    // Set userData for raycasting on parent mesh and all children recursively
    if (planetRef.current) {
      setUserDataRecursively(planetRef.current);
    }
  }, [currentScene, name, isDestroyed]);

  useFrame(({ clock }) => {
    if (!planetRef.current) return;

    // Less frequent updates for better performance
    const time = clock.getElapsedTime();
    
    // Continuous rotation for all planets (less frequent)
    planetRef.current.rotation.y += isDestroyed ? 0.001 : 0.0003;
    
    if (!isDestroyed) {
      // Normal planet hover effects
      const targetScale = hoveredObject?.userData?.name === name ? 1.05 : 1.0;
      planetRef.current.scale.lerp(
        new THREE.Vector3(scale[0] * targetScale, scale[1] * targetScale, scale[2] * targetScale),
        0.05 // Slower lerp for smoother animation
      );

      // Hover bobbing effect (less frequent calculation)
      if (hoveredObject?.userData?.name === name) {
        planetRef.current.position.y = position[1] + Math.sin(time * 2) * 0.08;
      } else {
        planetRef.current.position.y = position[1];
      }
    } else {
      // Destroyed planet effects
      planetRef.current.scale.set(scale[0], scale[1], scale[2]); // Keep original size
      
      // Chaotic rotation (reduced frequency)
      planetRef.current.rotation.x += 0.001;
      planetRef.current.rotation.z += 0.0005;
      
      // Slow sinking with oscillation
      const sinkAmount = Math.sin(time * 0.3) * 0.1 - 0.3;
      planetRef.current.position.set(position[0], position[1] + sinkAmount, position[2]);
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      scale={scale} // Initial scale
      rotation={rotation}
      visible={true} // Always visible - we modify materials instead of hiding
    >
      <primitive object={currentScene} />
    </mesh>
  );
};

// Preload planet models for better performance
useGLTF.preload('/assets/3d/Planet.glb');
useGLTF.preload('/assets/3d/planet-2.glb');
useGLTF.preload('/assets/3d/planet-3.glb');

export default Planet;