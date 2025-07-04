// src/models/Planet.jsx
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE for Vector3 and other Three.js utilities

const Planet = ({ planetScenePath, position, scale, rotation, name, hoveredObject }) => {
  const planetRef = useRef();
  const { scene } = useGLTF(planetScenePath); // Loads the specific planet model

  useEffect(() => {
    // Apply initial scale and position to the model itself if needed
    // This is useful if the model itself is not scaled correctly in its file
    // You might need to adjust these based on your specific models
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Set userData for all mesh children so raycasting works
        child.userData.isTargetable = true;
        child.userData.name = name;
      }
    });

    // Set userData for raycasting targetability on the parent mesh too
    if (planetRef.current) {
      planetRef.current.userData.isTargetable = true;
      planetRef.current.userData.name = name;
    }
  }, [scene, name]); // Depend on scene and name to re-apply if props change

  useFrame(({ clock }) => {
    if (planetRef.current) {
      // Add a subtle rotation to the planet to make it look alive
      planetRef.current.rotation.y += 0.0005; // Adjust speed as needed

      // Example of hover effect: scale up slightly
      const targetScale = hoveredObject?.userData?.name === name ? 1.05 : 1.0;
      planetRef.current.scale.lerp(
        new THREE.Vector3(scale[0] * targetScale, scale[1] * targetScale, scale[2] * targetScale),
        0.1 // Interpolation factor for smooth transition
      );

      // Example of hover effect: subtle bobbing
      // We need the original Y position, so we use the prop 'position[1]'
      if (hoveredObject?.userData?.name === name) {
        planetRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.1;
      } else {
        planetRef.current.position.y = position[1]; // Reset to original Y if not hovered
      }
    }
  });

  return (
    <mesh
      ref={planetRef}
      position={position}
      scale={scale} // Initial scale
      rotation={rotation}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Planet;