// src/components/UI/Credits.jsx
import React, { useState } from 'react';
import './Credits.css';

const Credits = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCredits = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Credits toggle button */}
      <button
        className="credits-toggle"
        onClick={toggleCredits}
        title="View Credits"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '300px', // Move away from sound visualizer
          background: 'rgba(0, 20, 40, 0.9)',
          border: '1px solid rgba(0, 255, 136, 0.6)',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          color: '#00ffff',
          fontSize: '18px',
          cursor: 'pointer',
          zIndex: 120,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)';
        }}
      >
        ℹ️
      </button>

      {/* Credits panel */}
      {isOpen && (
        <div className="credits-overlay" onClick={toggleCredits}>
          <div className="credits-panel" onClick={(e) => e.stopPropagation()}>
            <div className="credits-header">
              <h3>🎨 Credits & Attributions</h3>
              <button className="credits-close" onClick={toggleCredits}>×</button>
            </div>
            
            <div className="credits-content">
              <div className="credit-section">
                <h4>🎵 Audio Assets</h4>
                <ul>
                  <li><strong>space-music.mp3</strong> - Background ambient music</li>
                  <li><strong>laser.mp3</strong> - Laser firing sound effect</li>
                  <li><strong>destructuon.mp3</strong> - Impact/destruction sound</li>
                </ul>
              </div>

              <div className="credit-section">
                <h4>🌍 3D Models</h4>
                <ul>
                  <li><strong>gun.glb</strong> - FPS weapon viewmodel</li>
                  <li><strong>Planet.glb</strong> - Main planet model</li>
                  <li><strong>planet-2.glb</strong> - Secondary planet variant</li>
                  <li><strong>planet-3.glb</strong> - Tertiary planet variant</li>
                  <li><strong>prop-ship.glb</strong> - Space ship decoration</li>
                  <li><strong>space-environment.glb</strong> - Environmental assets</li>
                </ul>
              </div>

              <div className="credit-section">
                <h4>🛠️ Technologies Used</h4>
                <ul>
                  <li><strong>React</strong> - UI framework</li>
                  <li><strong>Three.js</strong> - 3D graphics library</li>
                  <li><strong>@react-three/fiber</strong> - React renderer for Three.js</li>
                  <li><strong>@react-three/drei</strong> - Useful helpers for R3F</li>
                  <li><strong>Vite</strong> - Build tool and development server</li>
                  <li><strong>GitHub Pages</strong> - Hosting platform</li>
                </ul>
              </div>

              <div className="credit-section">
                <h4>💡 Special Thanks</h4>
                <ul>
                  <li>Three.js community for excellent documentation</li>
                  <li>React Three Fiber ecosystem contributors</li>
                  <li>Open source 3D model and audio creators</li>
                </ul>
              </div>
            </div>

            <div className="credits-footer">
              <p>Built with ❤️ using React, Three.js, and modern web technologies</p>
              <p>© 2025 - Interactive 3D Portfolio</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Credits;
