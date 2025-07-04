// src/components/GameManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import FPSController from './FPSController';
import ShootingSystem from './ShootingSystem';
import SceneLighting from './SceneLighting';
import PortfolioScene from './Scene/PortfolioScene';

const GameManager = () => {
  const { gl } = useThree();
  const [hoveredObject, setHoveredObject] = useState(null);
  const [shotObject, setShotObject] = useState(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  // FPS Controller setup
  const fpsController = FPSController({ 
    onPointerLockChange: setIsPointerLocked 
  });

  // Shooting system setup
  const shootingSystem = ShootingSystem({
    isPointerLocked: fpsController.isPointerLocked,
    requestPointerLock: fpsController.requestPointerLock,
    onHit: (targetName, hitData) => {
      setShotObject(targetName);
      // Add any hit effects here
      console.log(`Portfolio section hit: ${targetName}`);
    }
  });

  // Right click handler for exiting pointer lock
  const handleRightClick = useCallback((event) => {
    event.preventDefault();
    if (event.button === 2 && fpsController.isPointerLocked) {
      fpsController.exitPointerLock();
    }
  }, [fpsController]);

  // Event listeners for shooting and right-click
  useEffect(() => {
    const canvasElement = gl.domElement;

    canvasElement.addEventListener('mousedown', shootingSystem.handleShoot);
    canvasElement.addEventListener('contextmenu', handleRightClick);

    return () => {
      canvasElement.removeEventListener('mousedown', shootingSystem.handleShoot);
      canvasElement.removeEventListener('contextmenu', handleRightClick);
    };
  }, [shootingSystem.handleShoot, handleRightClick, gl]);

  return (
    <>
      <SceneLighting />
      <PortfolioScene hoveredObject={hoveredObject} />
    </>
  );
};

export default GameManager;
