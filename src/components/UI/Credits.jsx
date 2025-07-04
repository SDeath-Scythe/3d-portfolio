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
      {/* Credits Toggle Button */}
      <button 
        className={`credits-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleCredits}
        title="View Credits"
      >
        <span className="credits-icon">ⓘ</span>
      </button>

      {/* Credits Panel */}
      {isOpen && (
        <div className="credits-overlay" onClick={toggleCredits}>
          <div className="credits-panel" onClick={(e) => e.stopPropagation()}>
            <div className="credits-header">
              <h3 className="credits-title">MISSION CREDITS</h3>
              <button className="credits-close" onClick={toggleCredits}>×</button>
            </div>
            
            <div className="credits-content">
              <div className="credits-section">
                <h4 className="credits-category">AUDIO ASSETS</h4>
                <div className="credits-item">
                  <span className="credits-label">Music:</span>
                  <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=342767" 
                     target="_blank" rel="noopener noreferrer" className="credits-link">
                    Universfield
                  </a>
                  <span className="credits-source">from Pixabay</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Laser SFX:</span>
                  <a href="https://pixabay.com/users/ribhavagrawal-39286533/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=230500" 
                     target="_blank" rel="noopener noreferrer" className="credits-link">
                    Ribhav Agrawal
                  </a>
                  <span className="credits-source">from Pixabay</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Hit SFX:</span>
                  <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=39409" 
                     target="_blank" rel="noopener noreferrer" className="credits-link">
                    freesound_community
                  </a>
                  <span className="credits-source">from Pixabay</span>
                </div>
              </div>

              <div className="credits-section">
                <h4 className="credits-category">3D MODELS</h4>
                <div className="credits-item">
                  <span className="credits-label">Blaster:</span>
                  <a href="https://skfb.ly/oxUYM" target="_blank" rel="noopener noreferrer" className="credits-link">
                    Nodashii
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Planet 1:</span>
                  <a href="https://skfb.ly/oyDUw" target="_blank" rel="noopener noreferrer" className="credits-link">
                    cmzw
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Planet 2:</span>
                  <a href="https://skfb.ly/6UErL" target="_blank" rel="noopener noreferrer" className="credits-link">
                    Yo.Ri
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Environment:</span>
                  <a href="https://skfb.ly/JIPA" target="_blank" rel="noopener noreferrer" className="credits-link">
                    Shapernode
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Space Environment:</span>
                  <a href="https://skfb.ly/6QV7A" target="_blank" rel="noopener noreferrer" className="credits-link">
                    Loïc Norgeot
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
                
                <div className="credits-item">
                  <span className="credits-label">Spaceship:</span>
                  <a href="https://skfb.ly/6BY9M" target="_blank" rel="noopener noreferrer" className="credits-link">
                    EdwiixGG
                  </a>
                  <span className="credits-license">CC Attribution</span>
                </div>
              </div>
            </div>
            
            <div className="credits-footer">
              <div className="credits-notice">
                All assets used under Creative Commons Attribution License
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Credits;
