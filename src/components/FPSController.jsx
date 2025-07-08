// src/components/FPSController.jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FPSController = ({ onPointerLockChange }) => {
  const { camera, gl } = useThree();
  
  // Refs for camera rotation (yaw for horizontal, pitch for vertical)
  const yaw = useRef(0);
  const pitch = useRef(0);
  const isInitialized = useRef(false);
  
  // Movement state
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
    c: false
  });

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const moveSpeed = 8;
  const sensitivity = 0.0015;
  
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  // --- Initial Camera Setup to Aim at About Me Planet ---
  useEffect(() => {
    if (!isInitialized.current) {
      // About Me planet position
      const aboutMePosition = new THREE.Vector3(2, 5, -55);
      const cameraPosition = camera.position;
      
      // Calculate direction to About Me planet
      const direction = aboutMePosition.clone().sub(cameraPosition);
      direction.normalize();
      
      // Calculate yaw (horizontal rotation)
      yaw.current = Math.atan2(-direction.x, -direction.z);
      
      // Calculate pitch (vertical rotation)
      pitch.current = Math.asin(direction.y);
      
      // Apply initial rotation to camera
      camera.rotation.order = 'YXZ';
      camera.rotation.y = yaw.current;
      camera.rotation.x = pitch.current;
      camera.rotation.z = 0;
      
      isInitialized.current = true;
    }
  }, [camera]);

  // --- Camera Reset Function ---
  const resetCamera = useCallback(() => {
    // Reset camera rotation to prevent inversion issues
    yaw.current = 0;
    pitch.current = 0;
    camera.rotation.set(0, 0, 0);
    camera.rotation.order = 'YXZ';
  }, [camera]);

  // --- Camera Rotation Logic (Mouse Look) ---
  const handleMouseMove = useCallback((event) => {
    if (!isPointerLocked) return;

    // More consistent mouse movement handling
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    // Apply mouse movement with proper sensitivity
    yaw.current -= movementX * sensitivity;
    pitch.current -= movementY * sensitivity;

    // Clamp vertical rotation to prevent flipping
    pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

    // Apply rotations to camera using Euler angles to prevent gimbal lock
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
    camera.rotation.z = 0; // Prevent roll
  }, [isPointerLocked, camera, sensitivity]);

  // --- WASD Movement Logic ---
  const handleKeyDown = useCallback((event) => {
    switch (event.code) {
      case 'KeyW': keys.current.w = true; break;
      case 'KeyA': keys.current.a = true; break;
      case 'KeyS': keys.current.s = true; break;
      case 'KeyD': keys.current.d = true; break;
      case 'ShiftLeft': keys.current.shift = true; break;
      case 'Space': keys.current.space = true; break;
      case 'KeyC': keys.current.c = true; break;
      case 'KeyR': 
        // Reset camera rotation if it gets inverted
        if (event.ctrlKey) {
          resetCamera();
        }
        break;
    }
  }, [resetCamera]);

  const handleKeyUp = useCallback((event) => {
    switch (event.code) {
      case 'KeyW': keys.current.w = false; break;
      case 'KeyA': keys.current.a = false; break;
      case 'KeyS': keys.current.s = false; break;
      case 'KeyD': keys.current.d = false; break;
      case 'ShiftLeft': keys.current.shift = false; break;
      case 'Space': keys.current.space = false; break;
      case 'KeyC': keys.current.c = false; break;
    }
  }, []);

  // --- Frame Update Logic ---
  useFrame((state, delta) => {
    if (!isPointerLocked) return;

    // Calculate movement direction
    direction.current.set(0, 0, 0);
    if (keys.current.w) direction.current.z -= 1;
    if (keys.current.s) direction.current.z += 1;
    if (keys.current.a) direction.current.x -= 1;
    if (keys.current.d) direction.current.x += 1;

    // Normalize direction
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply camera rotation to movement direction
    direction.current.applyEuler(camera.rotation);

    // Calculate velocity with speed multiplier
    const speed = keys.current.shift ? moveSpeed * 2 : moveSpeed;
    velocity.current.copy(direction.current).multiplyScalar(speed * delta);

    // Apply movement to camera position
    camera.position.add(velocity.current);

    // Vertical movement
    if (keys.current.space) {
      camera.position.y += speed * delta;
    }
    if (keys.current.c) {
      camera.position.y -= speed * delta;
    }
  });

  // --- Pointer Lock Management ---
  const requestPointerLock = useCallback(() => {
    gl.domElement.requestPointerLock();
  }, [gl]);

  const exitPointerLock = useCallback(() => {
    document.exitPointerLock();
  }, []);

  const pointerLockChange = useCallback(() => {
    const locked = document.pointerLockElement === gl.domElement;
    setIsPointerLocked(locked);
    
    // Reset camera rotation when entering pointer lock to prevent inversion
    if (locked) {
      camera.rotation.order = 'YXZ';
      // Initialize rotation values from current camera rotation
      yaw.current = camera.rotation.y;
      pitch.current = camera.rotation.x;
    }
    
    onPointerLockChange?.(locked);
  }, [gl, onPointerLockChange, camera]);

  const pointerLockError = useCallback(() => {
    console.error('Pointer lock error');
  }, []);

  // --- Event Listeners ---
  useEffect(() => {
    const canvasElement = gl.domElement;

    canvasElement.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', pointerLockChange);
    document.addEventListener('pointerlockerror', pointerLockError);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvasElement.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', pointerLockChange);
      document.removeEventListener('pointerlockerror', pointerLockError);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleMouseMove, pointerLockChange, pointerLockError, handleKeyDown, handleKeyUp, gl]);

  return {
    isPointerLocked,
    requestPointerLock,
    exitPointerLock,
    resetCamera
  };
};

export default FPSController;
