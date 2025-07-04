// src/components/SceneLighting.jsx
import React from 'react';

const SceneLighting = () => {
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />
    </>
  );
};

export default SceneLighting;
