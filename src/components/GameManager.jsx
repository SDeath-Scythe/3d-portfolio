// src/components/GameManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudio } from './AudioManager';
import FPSController from './FPSController';
import ShootingSystem from './ShootingSystem';
import SceneLighting from './SceneLighting';
import PortfolioScene from './Scene/PortfolioScene';
import LaserBeam from './LaserBeam';
import RevivalBeam from './RevivalBeam';

const GameManager = ({ onPlanetHit }) => {
  const { gl, camera } = useThree();
  const { playLaserSound, playHitSound, startBackgroundMusic } = useAudio();
  const [hoveredObject, setHoveredObject] = useState(null);
  const [shotObject, setShotObject] = useState(null);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log('GameManager mounted');
    console.log('Camera:', camera);
    console.log('GL:', gl);
  }, [camera, gl]);
  
  // Destroyed planets state
  const [destroyedPlanets, setDestroyedPlanets] = useState([]);
  
  // Laser beam state (for normal shooting)
  const [laserBeam, setLaserBeam] = useState({
    visible: false,
    startPosition: null,
    endPosition: null
  });

  // Revival beam state (for right-click revival)
  const [revivalBeam, setRevivalBeam] = useState({
    visible: false,
    startPosition: null,
    endPosition: null
  });

  // Start background music when component mounts
  useEffect(() => {
    // Delay to ensure user interaction has happened
    const timer = setTimeout(() => {
      startBackgroundMusic();
    }, 1000);

    return () => clearTimeout(timer);
  }, [startBackgroundMusic]);

  // FPS Controller setup
  const fpsController = FPSController({ 
    onPointerLockChange: setIsPointerLocked 
  });

  // Shooting system setup
  const shootingSystem = ShootingSystem({
    isPointerLocked: fpsController.isPointerLocked,
    requestPointerLock: fpsController.requestPointerLock,
    onShoot: (startPos, endPos) => {
      // Create laser beam effect
      setLaserBeam({
        visible: true,
        startPosition: startPos,
        endPosition: endPos
      });
      
      // Play laser sound
      playLaserSound();
    },
    onRevivalShoot: (startPos, endPos) => {
      console.log("GameManager: Revival beam triggered!", startPos, endPos); // Debug log
      // Create revival beam effect
      setRevivalBeam({
        visible: true,
        startPosition: startPos,
        endPosition: endPos
      });
      console.log("GameManager: Revival beam state set to visible"); // Debug log
      
      // Play hit sound for revival (different from laser)
      playHitSound();
      console.log("GameManager: Revival sound played!"); // Debug log
    },
    onHit: (targetName, hitData) => {
      setShotObject(targetName);
      
      // Play hit sound
      playHitSound();
      
      // Exit pointer lock when showing info card
      if (fpsController.isPointerLocked) {
        fpsController.exitPointerLock();
      }
      
      // Notify parent component about planet hit
      onPlanetHit?.(targetName);
      
      // Add the planet to destroyed planets if it's not already destroyed
      if (targetName && !destroyedPlanets.includes(targetName)) {
        setDestroyedPlanets(prev => [...prev, targetName]);
      }
    },
    onRevive: (targetName, hitData) => {
      console.log("GameManager: Planet revival triggered for:", targetName); // Debug log
      // Handle right-click revival
      setShotObject(targetName);
      
      // Play hit sound (could be different sound for revival)
      playHitSound();
      
      // Remove the planet from destroyed planets to revive it
      if (targetName && destroyedPlanets.includes(targetName)) {
        setDestroyedPlanets(prev => prev.filter(planet => planet !== targetName));
        console.log("GameManager: Planet revived and removed from destroyed list"); // Debug log
      }
    }
  });
  
  // Handle laser beam completion
  const handleLaserComplete = useCallback(() => {
    setLaserBeam(prev => ({ ...prev, visible: false }));
  }, []);

  // Handle revival beam completion
  const handleRevivalBeamComplete = useCallback(() => {
    setRevivalBeam(prev => ({ ...prev, visible: false }));
  }, []);

  // Right click handler is now handled in ShootingSystem
  // Remove the separate right-click handler to avoid conflicts

  // Event listeners for shooting
  useEffect(() => {
    const canvasElement = gl.domElement;

    canvasElement.addEventListener('mousedown', shootingSystem.handleShoot);
    // Remove contextmenu prevention here since it's handled in ShootingSystem

    return () => {
      canvasElement.removeEventListener('mousedown', shootingSystem.handleShoot);
    };
  }, [shootingSystem.handleShoot, gl]);

  return (
    <>
      <SceneLighting />
      <PortfolioScene 
        hoveredObject={hoveredObject} 
        destroyedPlanets={destroyedPlanets}
      />
      
      {/* Normal laser beam effect */}
      <LaserBeam
        startPosition={laserBeam.startPosition}
        endPosition={laserBeam.endPosition}
        visible={laserBeam.visible}
        onComplete={handleLaserComplete}
      />
      
      {/* Revival beam effect */}
      <RevivalBeam
        startPosition={revivalBeam.startPosition}
        endPosition={revivalBeam.endPosition}
        visible={revivalBeam.visible}
        onComplete={handleRevivalBeamComplete}
      />
    </>
  );
};

export default GameManager;
