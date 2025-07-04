// src/components/FPSController.jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FPSController = ({ onPointerLockChange }) => {
  const { camera, gl } = useThree();
  
  // Refs for camera rotation (yaw for horizontal, pitch for vertical)
  const yaw = useRef(0);
  const pitch = useRef(0);
  
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
  const sensitivity = 0.002; // Slightly increased for better responsiveness
  
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  
  // Add smoothing for mouse movement
  const smoothingFactor = 0.8;

  // --- Camera Rotation Logic (Mouse Look) - Simple and reliable ---
  const handleMouseMove = useCallback((event) => {
    if (!isPointerLocked) return;

    // Update rotation values
    yaw.current -= event.movementX * sensitivity;
    pitch.current -= event.movementY * sensitivity;

    // Clamp pitch to prevent over-rotation
    pitch.current = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, pitch.current));

    // Apply rotations using proper Euler order to prevent gimbal lock
    camera.rotation.order = 'YXZ'; // This prevents gimbal lock
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
    camera.rotation.z = 0; // Keep roll at zero
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
        // Reset camera orientation
        yaw.current = 0;
        pitch.current = 0;
        camera.rotation.set(0, 0, 0);
        camera.rotation.order = 'YXZ';
        break;
    }
  }, [camera]);

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

    // Apply only yaw rotation to movement (ignore pitch for movement)
    const yawEuler = new THREE.Euler(0, yaw.current, 0);
    direction.current.applyEuler(yawEuler);

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
    onPointerLockChange?.(locked);
  }, [gl, onPointerLockChange]);

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
    exitPointerLock
  };
};

export default FPSController;
