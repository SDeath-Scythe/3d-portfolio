// src/components/UI/InfoCard.jsx
import React, { useEffect } from 'react';
import './InfoCard.css';

const InfoCard = ({ visible, planetName, onClose, onRequestCombatMode }) => {
  // Handle ESC key to close InfoCard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && visible) {
        handleClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  // Enhanced close handler that returns to combat mode
  const handleClose = () => {
    onClose();
    // Small delay to ensure InfoCard is fully closed before entering combat mode
    setTimeout(() => {
      onRequestCombatMode?.();
    }, 100);
  };

  if (!visible) return null;

  const getCardContent = () => {
    switch (planetName) {
      case 'Planet_About':
        return {
          title: '🌟 About Me',
          content: [
            '👋 Hi! I\'m a passionate developer with expertise in:',
            '',
            '🚀 Frontend: React, JavaScript, TypeScript',
            '🎨 3D Graphics: Three.js, WebGL, R3F',
            '⚡ Backend: Node.js, Python, APIs',
            '🛠️ Tools: Git, Docker, VS Code',
            '',
            '💡 I love creating immersive web experiences that push the boundaries of what\'s possible in the browser!'
          ]
        };
      case 'Planet_Projects':
        return {
          title: '🛠️ My Projects',
          content: [
            '🎮 3D FPS Portfolio - Interactive portfolio with Three.js',
            '🌐 E-commerce Platform - Full-stack React application',
            '📱 Mobile App - Cross-platform with React Native',
            '🤖 AI Chatbot - Natural language processing integration',
            '🎯 Game Engine - Custom WebGL renderer',
            '📊 Data Visualization - Interactive charts and graphs',
            '',
            '🔗 Check out my GitHub for more projects!'
          ]
        };
      case 'Planet_Skills':
        return {
          title: '⚡ Technical Skills',
          content: [
            '🌐 Frontend Development:',
            '  • React, Vue.js, Angular',
            '  • HTML5, CSS3, SASS/SCSS',
            '  • JavaScript (ES6+), TypeScript',
            '',
            '🔧 Backend Development:',
            '  • Node.js, Express, FastAPI',
            '  • Python, Java, C++',
            '  • RESTful APIs, GraphQL',
            '',
            '🎨 3D & Graphics:',
            '  • Three.js, WebGL, GLSL',
            '  • Blender, Unity, Unreal Engine',
            '',
            '🗄️ Databases: MongoDB, PostgreSQL, Redis'
          ]
        };
      default:
        return {
          title: '🌌 Unknown Planet',
          content: ['This planet holds mysteries yet to be discovered...']
        };
    }
  };

  const { title, content } = getCardContent();

  return (
    <div className="info-card-overlay" onClick={handleClose}>
      <div className="info-card" onClick={(e) => e.stopPropagation()}>
        <div className="info-card-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="info-card-content">
          {content.map((line, index) => (
            <p key={index} className={line === '' ? 'spacer' : ''}>{line}</p>
          ))}
        </div>
        <div className="info-card-footer">
          <p>🎯 Right-click to revive destroyed planets | Press ESC to close and return to combat</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
