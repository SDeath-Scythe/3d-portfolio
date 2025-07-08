// src/config/assetPaths.js

// Get the base path for assets based on environment
const getBasePath = () => {
  // In production (GitHub Pages), use the repository name as base
  // In development, use empty string for local paths
  return import.meta.env.PROD ? '/3d-portfolio' : '';
};

// Helper function to get correct asset path
export const getAssetPath = (path) => {
  const basePath = getBasePath();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};

// Pre-configured asset paths
export const ASSET_PATHS = {
  // 3D Models
  GUN: getAssetPath('/assets/3d/gun.glb'),
  PLANET_1: getAssetPath('/assets/3d/Planet.glb'),
  PLANET_2: getAssetPath('/assets/3d/planet-2.glb'),
  PLANET_3: getAssetPath('/assets/3d/planet-3.glb'),
  PROP_SHIP: getAssetPath('/assets/3d/prop-ship.glb'),
  SPACE_ENVIRONMENT: getAssetPath('/assets/3d/space-environment.glb'),
  
  // Audio
  SPACE_MUSIC: getAssetPath('/assets/audio/space-music.mp3'),
  LASER_SOUND: getAssetPath('/assets/audio/laser.mp3'),
  HIT_SOUND: getAssetPath('/assets/audio/destructuon.mp3'),
};
