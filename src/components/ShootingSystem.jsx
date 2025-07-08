// src/components/ShootingSystem.jsx
import { useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingSystem = ({ isPointerLocked, requestPointerLock, onHit, onShoot, onRevive, onRevivalShoot }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2(0, 0)); // Fixed center for crosshair

  // --- Shooting Logic ---
  const handleShoot = useCallback((event) => {
    console.log("Mouse button pressed:", event.button); // Debug log
    
    if (!isPointerLocked) {
      requestPointerLock();
      return;
    }

    // Calculate beam start position (from gun muzzle area, but closer to camera for visibility)
    const gunOffset = new THREE.Vector3(0.8, -0.4, -1.0);
    gunOffset.applyEuler(camera.rotation);
    const beamStart = camera.position.clone().add(gunOffset);

    // Update raycaster for shooting from camera center
    raycaster.current.setFromCamera(mouse.current, camera);
    
    // Get all objects in scene
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    let hitTarget = null;
    let beamEnd = null;
    let validIntersects = []; // Define outside the if block
    
    if (intersects.length > 0) {
      // Filter out gun objects first
      validIntersects = intersects.filter(
        (intersect) => !intersect.object.userData.isGun
      );
      
      console.log("Valid intersects (excluding gun):", validIntersects.length);
      console.log("Valid intersects details:", validIntersects.map(i => ({ 
        name: i.object.name || 'unnamed', 
        userData: i.object.userData,
        distance: i.distance 
      })));
      
      // Use the first valid intersection as beam end point
      if (validIntersects.length > 0) {
        beamEnd = validIntersects[0].point;
      }
    }

    // If no intersection, create a beam that goes far into the distance
    if (!beamEnd) {
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyEuler(camera.rotation);
      beamEnd = camera.position.clone().add(direction.multiplyScalar(100));
    }

    if (event.button === 0) { // Left click - Normal shooting
      // Find targetable objects (only planets with proper names)
      hitTarget = validIntersects.find((intersect) => {
        let obj = intersect.object;
        
        // Check current object and traverse up the parent hierarchy
        while (obj) {
          if (obj.userData.name && obj.userData.name.startsWith('Planet_')) {
            return true;
          }
          obj = obj.parent;
        }
        return false;
      });
      
      // Trigger laser beam effect
      onShoot?.(beamStart, beamEnd);

      if (hitTarget) {
        // Find the planet name by traversing up the hierarchy
        let planetName = null;
        let obj = hitTarget.object;
        while (obj && !planetName) {
          if (obj.userData.name && obj.userData.name.startsWith('Planet_')) {
            planetName = obj.userData.name;
            break;
          }
          obj = obj.parent;
        }
        
        if (planetName) {
          console.log("HIT TARGET:", planetName);
          console.log("Hit position:", hitTarget.point);
          console.log("Distance:", hitTarget.distance);
          onHit?.(planetName, hitTarget);
        }
      } else {
        console.log("Shot missed - no planets hit.");
      }
    } else if (event.button === 2) { // Right click - Revival shooting
      console.log("RIGHT CLICK DETECTED!"); // Debug log
      event.preventDefault(); // Prevent context menu
      
      // Always trigger revival beam on right click
      console.log("TRIGGERING REVIVAL BEAM AND SOUND"); // Debug log
      console.log("Revival beam positions:", { beamStart, beamEnd }); // Debug beam positions
      onRevivalShoot?.(beamStart, beamEnd);
      
      // Find destroyed planets for revival - check both direct userData and parent hierarchy
      hitTarget = validIntersects.find((intersect) => {
        let obj = intersect.object;
        
        // Check current object and traverse up the parent hierarchy
        while (obj) {
          if (obj.userData.isDestroyed && obj.userData.name) {
            console.log("Found destroyed planet:", obj.userData.name, "isDestroyed:", obj.userData.isDestroyed);
            return true;
          }
          obj = obj.parent;
        }
        return false;
      });

      console.log("Revival validIntersects:", validIntersects.length); // Debug log
      console.log("Revival hitTarget:", hitTarget); // Debug log

      if (hitTarget) {
        // Find the planet name by traversing up the hierarchy
        let planetName = null;
        let obj = hitTarget.object;
        while (obj && !planetName) {
          if (obj.userData.name && obj.userData.isDestroyed) {
            planetName = obj.userData.name;
            break;
          }
          obj = obj.parent;
        }
        
        if (planetName) {
          console.log("REVIVING TARGET:", planetName);
          onRevive?.(planetName, hitTarget);
        }
      } else {
        console.log("Revival shot missed - no destroyed planets hit.");
      }
    }
  }, [isPointerLocked, camera, scene, requestPointerLock, onHit, onShoot, onRevive, onRevivalShoot]);

  return { handleShoot };
};

export default ShootingSystem;
