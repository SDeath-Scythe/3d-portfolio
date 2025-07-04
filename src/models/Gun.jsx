// src/models/Gun.jsx
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE for Vector3

const Gun = () => {
  const gunRef = useRef();
  const { scene } = useGLTF('/assets/3d/gun.glb'); // Use proper path
  const { camera } = useThree(); // Access the camera

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
      
      // Position gun at camera position + offset
      gunRef.current.position.copy(cameraPosition.add(offset));
      
      // Match camera rotation with slight adjustments
      gunRef.current.rotation.copy(cameraRotation);
      gunRef.current.rotation.x += Math.PI / 20;   // Slight upward tilt
      gunRef.current.rotation.y += Math.PI / 10;   // Angled toward center
      gunRef.current.rotation.z += Math.PI / 12;    // Slight roll
      
      // Add subtle animation (less frequent calculation)
      const time = clock.getElapsedTime();
      gunRef.current.position.y += Math.sin(time * 1.2) * 0.002; // Subtle breathing
      
      // Mark gun and its children as non-targetable (do this less frequently)
      if (Math.floor(time * 2) % 2 === 0) { // Only every half second
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
      <primitive object={clonedGunScene} /> {/* Use cloned scene */}
    </mesh>
  );
};

// Preload gun model for better performance
useGLTF.preload('/assets/3d/gun.glb');

export default Gun;