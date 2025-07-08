// src/models/Gun.jsx
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE for Vector3
import { ASSET_PATHS } from '../config/assetPaths';

const Gun = () => {
  const gunRef = useRef();
  const { scene } = useGLTF(ASSET_PATHS.GUN);
  const { camera } = useThree(); // Access the camera

  // Debug logging
  useEffect(() => {
    console.log('Gun component mounted, asset path:', ASSET_PATHS.GUN);
    console.log('Gun scene loaded:', scene);
  }, [scene]);

  // Clone the scene to avoid conflicts
  const clonedGunScene = scene.clone();

  // Position gun relative to camera using useFrame instead of attaching to camera
  useFrame(({ clock }) => {
    if (gunRef.current && camera) {
      // Position the gun relative to camera
      const cameraPosition = camera.position.clone();
      const cameraRotation = camera.rotation.clone();
      
      // Create offset vector relative to camera - positioned well out of crosshair path
      const offset = new THREE.Vector3(1.5, -1.0, -2.0);
      
      // Apply camera rotation to offset
      offset.applyEuler(cameraRotation);
      
      // Position gun at camera position + offset with smoothing
      const targetPosition = cameraPosition.add(offset);
      gunRef.current.position.lerp(targetPosition, 0.15);
      
      // Match camera rotation with slight adjustments and smoothing
      const targetRotation = cameraRotation.clone();
      targetRotation.x += Math.PI / 20;   // Slight upward tilt
      targetRotation.y += Math.PI / 10;   // Angled toward center
      targetRotation.z += Math.PI / 12;   // Slight roll
      
      gunRef.current.rotation.x = THREE.MathUtils.lerp(gunRef.current.rotation.x, targetRotation.x, 0.1);
      gunRef.current.rotation.y = THREE.MathUtils.lerp(gunRef.current.rotation.y, targetRotation.y, 0.1);
      gunRef.current.rotation.z = THREE.MathUtils.lerp(gunRef.current.rotation.z, targetRotation.z, 0.1);
      
      // Add subtle animations with reduced intensity
      const elapsedTime = clock.getElapsedTime();
      const breathingOffset = Math.sin(elapsedTime * 1.5) * 0.001; // Reduced breathing
      const swayOffset = Math.sin(elapsedTime * 2.0) * 0.005; // Reduced sway
      
      gunRef.current.position.y += breathingOffset;
      gunRef.current.position.x += swayOffset;
      
      // Mark gun and its children as non-targetable (do this less frequently)
      if (Math.floor(elapsedTime * 2) % 2 === 0) { // Only every half second
        gunRef.current.traverse((child) => {
          if (child.isMesh) {
            child.userData.isGun = true; // Mark as gun to exclude from raycasting
            child.raycast = () => {}; // Completely disable raycasting for gun meshes
          }
        });
      }
    }
  });

  return (
    <mesh
      ref={gunRef}
      scale={[0.08, 0.08, 0.08]} // Smaller scale for FPS viewmodel
      // Position and rotation will be set by useFrame
    >
      <primitive object={clonedGunScene} />
    </mesh>
  );
};

// Preload gun model for better performance
useGLTF.preload(ASSET_PATHS.GUN);

export default Gun;