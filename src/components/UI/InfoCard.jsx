// src/components/UI/InfoCard.jsx
import React, { useState, useEffect } from 'react';
import './InfoCard.css';

const InfoCard = ({ planetName, isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getCardContent = (planetName) => {
    switch (planetName) {
      case 'Planet_About':
        return {
          title: 'ABOUT SECTOR',
          subtitle: 'Personal Profile',
          content: [
            'Full-Stack Developer',
            'React & Three.js Specialist',
            'UI/UX Designer',
            'Problem Solver'
          ],
          details: 'Passionate about creating immersive web experiences and interactive 3D applications.',
          techStack: ['JavaScript', 'React', 'Three.js', 'Node.js']
        };
      case 'Planet_Projects':
        return {
          title: 'PROJECTS SECTOR',
          subtitle: 'Mission Portfolio',
          content: [
            '3D Portfolio Site',
            'E-commerce Platform',
            'Real-time Chat App',
            'Data Visualization'
          ],
          details: 'Innovative projects showcasing modern web technologies and creative solutions.',
          techStack: ['React', 'Three.js', 'WebGL', 'MongoDB']
        };
      case 'Planet_Skills':
        return {
          title: 'SKILLS SECTOR',
          subtitle: 'Technical Arsenal',
          content: [
            'Frontend Development',
            '3D Graphics & WebGL',
            'Backend Architecture',
            'Database Design'
          ],
          details: 'Comprehensive skill set spanning the full development lifecycle.',
          techStack: ['TypeScript', 'Python', 'Docker', 'AWS']
        };
      default:
        return {
          title: 'UNKNOWN SECTOR',
          subtitle: 'Classified',
          content: ['Access Denied'],
          details: 'Sector information is classified.',
          techStack: []
        };
    }
  };

  const cardData = getCardContent(planetName);

  if (!isAnimating && !isVisible) return null;

  return (
    <div className={`info-card-overlay ${isVisible ? 'visible' : ''}`}>
      <div className={`info-card ${isVisible ? 'active' : ''}`}>
        {/* Close button */}
        <button className="info-card-close" onClick={onClose}>
          <span className="close-icon">×</span>
        </button>

        {/* Header */}
        <div className="info-card-header">
          <div className="info-card-title">{cardData.title}</div>
          <div className="info-card-subtitle">{cardData.subtitle}</div>
          <div className="info-card-line"></div>
        </div>

        {/* Content */}
        <div className="info-card-content">
          <div className="info-card-section">
            <h3 className="section-title">OVERVIEW</h3>
            <ul className="content-list">
              {cardData.content.map((item, index) => (
                <li key={index} className="content-item">
                  <span className="bullet">▶</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="info-card-section">
            <h3 className="section-title">DETAILS</h3>
            <p className="details-text">{cardData.details}</p>
          </div>

          {cardData.techStack.length > 0 && (
            <div className="info-card-section">
              <h3 className="section-title">TECH STACK</h3>
              <div className="tech-stack">
                {cardData.techStack.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="info-card-footer">
          <div className="footer-text">TARGET ACQUIRED - DATA RETRIEVED</div>
          <div className="footer-line"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
