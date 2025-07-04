// src/components/ShootingSystem.jsx
import { useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingSystem = ({ isPointerLocked, requestPointerLock, onHit }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2(0, 0)); // Fixed center for crosshair

  // --- Shooting Logic ---
  const handleShoot = useCallback((event) => {
    if (!isPointerLocked) {
      requestPointerLock();
      return;
    }

    if (event.button === 0) { // Left click
      // Update raycaster for shooting from camera center
      raycaster.current.setFromCamera(mouse.current, camera);
      
      // Get all objects in scene
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      let hitTarget = null;
      if (intersects.length > 0) {
        // Filter out gun objects first
        const validIntersects = intersects.filter(
          (intersect) => !intersect.object.userData.isGun
        );
        
        console.log("Valid intersects (excluding gun):", validIntersects.length);
        console.log("Valid intersects details:", validIntersects.map(i => ({ 
          name: i.object.name || 'unnamed', 
          userData: i.object.userData,
          distance: i.distance 
        })));
        
        // Find the closest targetable object
        hitTarget = validIntersects.find(
          (intersect) => intersect.object.userData.isTargetable
        );
      }

      if (hitTarget) {
        console.log("HIT TARGET:", hitTarget.object.userData.name);
        console.log("Hit position:", hitTarget.point);
        console.log("Distance:", hitTarget.distance);
        onHit?.(hitTarget.object.userData.name, hitTarget);
      } else {
        console.log("Shot missed targetable object.");
        console.log("Total intersections:", intersects.length);
        console.log("All intersected objects:", intersects.map(i => ({ 
          name: i.object.name || 'unnamed', 
          userData: i.object.userData,
          distance: i.distance 
        })));
      }
    }
  }, [isPointerLocked, camera, scene, requestPointerLock, onHit]);

  return { handleShoot };
};

export default ShootingSystem;
